# tipitaka2500.github.io

## The World Tipiṭaka Edition

*“The Buddhist Era 2500 Great International Council Pāḷi Tipiṭaka, Roman Script 2005” (Mahāsaṅgīti Tipiṭaka Buddhavasse 2500)*

This website contains a 2025 reconstruction of the complete 40-volume Roman-script edition of the 25-century old teaching of the Buddhist Theravāda tradition in the Pāḷi language from the B.E. 2500 (1957) Great Internatonal Buddhist Council.

It is derived from the Chaṭṭhasaṅgīti Council Edition, the Pāḷi-language text in Burmese Script, the result of the Great International Tipiṭaka Council convened in B.E. 2500 (1957) at Yangon by 2,500 erudite Theravāda Buddhist monks from all over the world.

The Roman Edition is the result of the work of The World Tipiṭaka Project B.E. 2542-2554 (1999-2011), by the M.L. Maniratana Bunnag Dhamma Society Fund under the Patronage of His Holiness Somdet Phra Ñāṇasaṁvara, the Supreme Patriarch of Thailand.

In preparation of the Roman-script text, the Dhamma Society partly based its Pāḷi language manuscript on two different sources which were presented as gifts of Dhamma to the Dhamma Society. However, the Dhamma Society found that the data from both sources contained significant anomalies and primary printing mistakes. With great care and under rigorous computer-controlled procedures, the project committee decided to undertake anew the proof-reading, including special Pāḷi recitation by canonical Tipiṭaka experts, who recited the entire text 4 times between B.E. 2543-2545 (2000-2002) and B.E. 2549-2550 (2006-2007) to verify every Pāḷi sound and to correct the printing errors of the original 40-volume manuscript. This proof-reading totalled to 2,708,706 words in Pāḷi or 20,606,104 letters in Roman script.

This website is created by Chris Tham (chris@christham.net)

### CC0 LICENSE

This work has been marked as dedicated to the public domain. See the [CC0 Deed](https://creativecommons.org/publicdomain/zero/1.0/)

## How was this site created

The site contents are based on using a Python script to convert the content in a Github repository containing a copy of the [original website contents](https://github.com/yuttadhammo/World-Tipitaka) from XML into HTML files, and then removing the original Javascript navigation and replacing with a Bootstrap sidebar. The files are then moved from a numeric naming scheme to a semantic naming scheme. FInally, the bespoke HTML and CSS are converted into standard HTML conventions and vanilla Bootstrap styling.

The scripts to generate this website are contained in https://github.com/tidipa/convert-scripts

## Release History

* v1: Initial version based on conversion of XML to HTML then adding Bootstrap
* v2: renamed files by inferring a semantic structure
* v2.1: fixed duplicate links
* v2.2: Enabled breadcrumbs
* v2.3: Refactored HTML to use Bootstrap for all styling. Turned on paragraph numbering.
* v2.4: Enabled deep links for division numbering (d[0-9]+) and paragraph numbering, changed colour scheme to Rosely
* v2.5: Handle ENDH3, ENDBOOK, G, bold and italic, leaving crappy table handling of verse for now
* v2.6: Fixed dark mode not working
* v2.7: Handle SUMMARY, firstLetter, gathaQuote, RLAP. Unhandled: paliSectionName, smallFont as I don't know how to deal with them differently. Add titles to files with no titles. Removed extraneous text.
* v2.8: Corrected some mistakes in the menu