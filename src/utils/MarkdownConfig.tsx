/* eslint-disable react/no-children-prop */
import { createStyles, rem, useMantineTheme } from "@mantine/core";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight, oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useColorScheme } from "@mantine/hooks";

type MarkdownComponentsProps = {
  node: {
    children: string;
    value: string;
  };
  inline: boolean;
  className: string;
  children: React.ReactNode;
};

const MarkdownConfig: object = {
  code({ node, inline, className, children, ...props }: MarkdownComponentsProps) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={oneDark}
        PreTag="div"
        language={match[1]}
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code className={className ? className : ""} {...props}>
        {children}
      </code>
    );
  },
};

export const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    borderRadius: theme.radius.sm,
  },

  item: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0],
    border: `${rem(1)} solid transparent`,
    position: "relative",
    zIndex: 0,
    transition: "transform 150ms ease",

    "&[data-active]": {
      transform: "scale(1.03)",
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor:
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },
  control: {
    textTransform: "uppercase",
    fontSize: rem(17),
    lineHeight: rem(20),
    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.blue[1],
    },
  },

  chevron: {
    "&[data-rotate]": {
      transform: "rotate(-90deg)",
    },
  },
  panel: {
    width: "auto",
    height: "90%", // height of the note card
  },
}));

export default MarkdownConfig;
