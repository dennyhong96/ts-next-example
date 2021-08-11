import { render, screen } from "../test-utils";
import MarkKeyword from "@components/markKeyword";

describe("components/MarkKeyword", () => {
  test("Should mark keyword correctly", async () => {
    const keyword = "KEYWORD";
    const namePart = "MOCK_";
    const name = `${namePart}${keyword}`;

    render(<MarkKeyword name={name} keyword={keyword} />);

    expect(screen.getByText(namePart)).toBeVisible();
    expect(screen.getByText(keyword)).toHaveStyle("background-color: yellow");
    expect(screen.getByText(namePart)).not.toHaveStyle("background-color: yellow");
  });
});
