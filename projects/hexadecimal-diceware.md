---
layout: layout.ejs
section: Projects
---
### Hexadecimal Diceware

This is a tool which allows you to implement physical passphrase generation using super-charged [Diceware](https://theworld.com/~reinhold/diceware.html){target=_blank} method that uses 4 hexadecimal digits (or non-ordinary [16-sided hexadecimal dice](https://www.thediceshoponline.com/impact-opaque-hexidice-d16-hexadecimal-dice){target=_blank}) to choose word from a list of 65,536 words.

Most dictionaries don't have that many words, I use a real word list as an input to [Gibrish](https://www.npmjs.com/package/gibrish), a Markov chain word generator, which then generates a list of 65,536 real and fake words.

The word list is then used to generate a 32 page book containing all 65,536 words laid out for easy lookup given 4 hexadecimal digits.  You can then generate a super-secure passphrase by rolling 4 hexadecimal dice and looking up the word in the book repeatedly until you have a passphrase of the desired length. Or, if you trust the pseudo-randomness of your machine, you can use the `uuidgen` utility to generate a random 32 character hexadecimal string which can be used to look up 8 words for a passphrase &ndash; which is the [128 bits of entropy recommended by some information security professionals](https://security.stackexchange.com/a/257535).

More to come&mldr;