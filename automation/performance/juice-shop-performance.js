import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '10s',
};

export default function () {
  const response = http.get('http://localhost:3000');

  check(response, {
    'status is 200': (res) => res.status === 200,
    'response time is below 2 seconds': (res) => res.timings.duration < 2000,
  });

  sleep(1);
}
