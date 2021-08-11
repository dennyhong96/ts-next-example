import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { waitFor, screen, render } from "../test-utils";
import ProjectsScreen from "@components/screens/projects";
import { IProject } from "@localTypes/projects";
import { IUser } from "@localTypes/user";

interface IFakeData {
  projects: IProject[];
  users: IUser[];
}

const fakeData: IFakeData = {
  projects: [],
  users: [],
};

const apiUrl = process.env.REACT_APP_API_URL;

const fakeAuth = {
  id: "a",
  name: "jack",
  token: "123",
};

// Setup mock server
const server = setupServer(
  rest.get(`${apiUrl}/me`, (req, res, ctx) => res(ctx.json(fakeAuth))),

  rest.get(`${apiUrl}/users`, (req, res, ctx) => res(ctx.json(fakeData.users))),

  rest.get(`${apiUrl}/projects`, (req, res, ctx) => {
    const { name = "", personId = undefined } = Object.fromEntries(req.url.searchParams);

    const result = fakeData?.projects?.filter((project) => {
      return project.name.includes(name) && (personId ? project.personId === personId : true);
    });

    return res(ctx.json(result));
  }),
);

describe("components/screens/ProjectsScreen", () => {
  // Open the mock server to requests
  beforeAll(() => server.listen());

  // Reset mock routes & handlers
  afterEach(() => server.resetHandlers());

  // Close mock routes & handlers
  afterAll(() => server.close());

  const waitForLoadingFinish = () =>
    waitFor(() => expect(screen.getByText("mockName")).toBeInTheDocument(), {
      timeout: 3000,
    });

  test.skip("Should render ProjectsScreen", async () => {
    render(<ProjectsScreen />, { route: "/projects" });

    await waitForLoadingFinish();

    expect(screen.getAllByRole("row").length).toBe(fakeData.projects.length + 1);
  });

  test.skip("Should search for project", async () => {
    render(<ProjectsScreen />, { route: "/projects?name=mockName" });

    await waitForLoadingFinish();

    expect(screen.getAllByRole("row").length).toBe(1);
    expect(screen.getByText("mockName")).toBeInTheDocument();
  });
});
