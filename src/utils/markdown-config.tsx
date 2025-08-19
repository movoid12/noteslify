import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type MarkdownConfProps = {
  inline: boolean;
  className: string;
  children: React.ReactNode;
};

export const pickColors = [
  '#25262b',
  '#868e96',
  '#fa5252',
  '#e64980',
  '#be4bdb',
  '#7950f2',
  '#4c6ef5',
  '#228be6',
  '#15aabf',
  '#12b886',
  '#40c057',
  '#82c91e',
  '#fab005',
  '#fd7e14',
];

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
