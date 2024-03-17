const inlineCommentRule = /(.*?)--.*/gu;
const multilineCommentRule = /\/\*[\S\s]*?\*\//gmu;
const whiteSpaceRule = /\s+/gu;

export const stripComments = (input: string): string => {
  return input
    .replaceAll(inlineCommentRule, (match, p1) => {
      return p1;
    })
    .replaceAll(multilineCommentRule, '')
    .replaceAll(whiteSpaceRule, ' ')
    .trim();
};
