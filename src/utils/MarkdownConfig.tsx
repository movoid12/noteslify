/* eslint-disable react/no-children-prop */
import { createStyles, rem } from '@mantine/core';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type MarkdownConfProps = {
  inline: boolean;
  className: string;
  children: React.ReactNode;
};

const markdownConf: object = {
  code({ inline, className, children, ...props }: MarkdownConfProps) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={oneDark}
        PreTag="div"
        language={match[1]}
        children={String(children).replace(/\n$/, '')}
        {...props}
      />
    ) : (
      <code className={className ? className : ''} {...props}>
        {children}
      </code>
    );
  },
};

export const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderRadius: theme.radius.sm,
  },

  item: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    border: `${rem(1)} solid transparent`,
    position: 'relative',
    zIndex: 0,
    transition: 'transform 150ms ease',

    '&[data-active]': {
      transform: 'scale(1.03)',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },
  control: {
    textTransform: 'uppercase',
    fontSize: rem(17),
    lineHeight: rem(20),
    '&[data-active]': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.blue[1],
    },
  },

  chevron: {
    '&[data-rotate]': {
      transform: 'rotate(-90deg)',
    },
  },
  panel: {
    width: 'auto',
    height: '90%', // height of the note card
  },
}));

export default markdownConf;
