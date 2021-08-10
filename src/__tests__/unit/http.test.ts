import { rest } from "msw";
import { setupServer } from "msw/node"; // mock http requests

import { http } from "@utils/http";

const server = setupServer();

// Unit test should not make real async requests to the server, mock with msw
describe("utils/http", () => {
  beforeAll(() => server.listen());

  // Reset mock server routers after each test
  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test("Should successfully make http request", async () => {
    const endpoint = "test-endpoit";

    const mockResult = { mockValue: "mock" };
    const mockApiUrl = `http://localhost:3001/${endpoint}`;

    // Setup mock server route handler
    server.use(
      rest.get(mockApiUrl, (req, res, ctx) => {
        return res(ctx.json(mockResult)); // Must return, otherwise Error: connect ECONNREFUSED 127.0.0.1:3001
      }),
    );

    const res = await http(mockApiUrl);

    expect(res).toBeTruthy();
    expect(res.data).toEqual(mockResult);
  });

  test("Should include token in header", async () => {
    const endpoint = "test-endpoit";

    const mockToken = "FAKE_TOKEN";
    const mockResult = { mockValue: "mock" };
    const mockApiUrl = `http://localhost:3001/${endpoint}`;

    let request: any;

    // Setup mock server route handler
    server.use(
      rest.get(mockApiUrl, (req, res, ctx) => {
        request = req;
        return res(ctx.json(mockResult)); // Must return, otherwise Error: connect ECONNREFUSED 127.0.0.1:3001
      }),
    );

    await http(mockApiUrl, { token: mockToken });

    expect(request).toBeTruthy();
    expect(request.headers).toBeTruthy();
    expect(request.headers.get("Authorization")).toBeTruthy();
    expect(request.headers.get("Authorization")).toBe(`Bearer ${mockToken}`);
  });
});
