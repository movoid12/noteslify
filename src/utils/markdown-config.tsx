import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type MarkdownConfProps = {
  inline: boolean;
  className: string;
  children: React.ReactNode;
};

export const markdownConf: object = {
  code({ inline, className, children, ...props }: MarkdownConfProps) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={oneDark}
        PreTag="div"
        language={match[1]}
        // biome-ignore lint/correctness/noChildrenProp: : <explanation>
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
