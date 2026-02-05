import { NextResponse } from "next/server";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const USER_LOGIN = "soualexandre";

const PINNED_QUERY = `
  query($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;

export type PinnedRepo = {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string | null } | null;
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: PINNED_QUERY,
        variables: { login: USER_LOGIN },
      }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("GitHub API error:", res.status, text);
      return NextResponse.json(
        { error: "GitHub API request failed" },
        { status: 502 }
      );
    }

    const json = await res.json();
    if (json.errors) {
      console.error("GitHub GraphQL errors:", json.errors);
      return NextResponse.json(
        { error: "GraphQL errors", details: json.errors },
        { status: 502 }
      );
    }

    const nodes = json.data?.user?.pinnedItems?.nodes ?? [];
    const repos: PinnedRepo[] = nodes.map((node: Record<string, unknown>) => ({
      name: node.name,
      description: node.description ?? null,
      url: node.url,
      stargazerCount: node.stargazerCount ?? 0,
      forkCount: node.forkCount ?? 0,
      primaryLanguage: node.primaryLanguage
        ? {
            name: (node.primaryLanguage as { name: string }).name,
            color: (node.primaryLanguage as { color: string | null }).color ?? null,
          }
        : null,
    }));

    return NextResponse.json(repos);
  } catch (err) {
    console.error("github-pinned fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch pinned repos" },
      { status: 500 }
    );
  }
}
