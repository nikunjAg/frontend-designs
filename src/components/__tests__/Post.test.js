import { render } from "@testing-library/react"

import Post from '../Post/Post'
import Tag from '../Post/Tag'

test('should render Tag Component', () => {

    const props = {
        name: "Test Tag",
    };

    const post = render(<Tag {...props} />);

    const title = post.getByTestId("tag_name");

    expect(title.textContent).toBe(props.name);
    expect(title.textContent).toBeDefined();
});

test('should render Post Component', () => {

    const props = {
        title: "Test Title",
        body: "Test Body",
        reactions: 5,
        tags: ["Reaction A", "Reaction B"],
    };

    const post = render(<Post {...props} />);

    const title = post.getByTestId("post_title");
    const body = post.getByTestId("post_body");
    const tags_list = post.getByTestId("post_tags_list");
    const post_reactions = post.getByTestId("post_reactions");

    expect(title.textContent).toBe(props.title);
    expect(body.textContent).toBe(props.body);
    expect(tags_list.children.length).toBe(props.tags.length);
    expect(post_reactions.textContent).toBe(`Reactions: ${props.reactions}`);
});