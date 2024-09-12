import escapeHTML from "escape-html";
import {Text} from "slate";
import {Fragment} from "preact";

const serialize = (children) =>
    children.map((node, i) => {
        if (Text.isText(node)) {
            let text = (
                <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
        );

            if (node.bold) {
                //text = <strong key={i}>{text}</strong>;
                text = <span key={i}>{text}</span>
            }

            if (node.code) {
                text = <code key={i}>{text}</code>;
            }

            if (node.italic) {
                text = <em key={i}>{text}</em>;
            }

            if (node.underline) {
                text = <span style={{textDecoration:"underline"}} key={i}>{text}</span>
            }

            // Handle other leaf types here...

            return <Fragment key={i}>{text}</Fragment>;
        }

        if (!node) {
            return null;
        }

        switch (node.type) {
            case "h1":
                return <h1 key={i}>{serialize(node.children)}</h1>;
            case "h2":
                return <h2 key={i}>{serialize(node.children)}</h2>
            case "h6":
                return <h6 key={i}>{serialize(node.children)}</h6>;
            case "blockquote":
                return <blockquote key={i}>{serialize(node.children)}</blockquote>;
            case "ul":
                return <ul key={i}>{serialize(node.children)}</ul>;
            case "ol":
                return <ol key={i}>{serialize(node.children)}</ol>;
            case "li":
                return <li key={i}>{serialize(node.children)}</li>;
            case "link":
                return (
                    <a href={escapeHTML(node.url)} key={i}>
                        {serialize(node.children)}
                    </a>
            );

            default:
                return <p key={i}>{serialize(node.children)}</p>;
            }
        }
    );

export default serialize