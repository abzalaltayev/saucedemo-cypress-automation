// performance/login-load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// Simple login load test
export const options = {
  stages: [
    { duration: '1m', target: 10 }, // Ramp up to 10 users over 1 minute
    { duration: '2m', target: 10 }, // Stay at 10 users for 2 minutes
    { duration: '1m', target: 0 }, // Ramp down to 0 users over 1 minute
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests must complete below 2s
    http_req_failed: ['rate<0.1'], // Error rate must be below 10%
  },
};

const BASE_URL = 'https://www.saucedemo.com';

export default function () {
  // Test data
  const user = { username: 'standard_user', password: 'secret_sauce' };

  // Step 1: Load login page
  const loginPageResponse = http.get(`${BASE_URL}/`);
  check(loginPageResponse, {
    'login page loads successfully': (r) => r.status === 200,
    'login page response time < 2s': (r) => r.timings.duration < 2000,
  });

  // Step 2: Perform login
  const loginPayload = {
    'user-name': user.username,
    password: user.password,
  };

  const loginResponse = http.post(`${BASE_URL}/`, loginPayload, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  check(loginResponse, {
    'login successful': (r) => r.status === 200,
    'login response time < 2s': (r) => r.timings.duration < 2000,
  });

  sleep(1); // Wait 1 second between iterations
}
