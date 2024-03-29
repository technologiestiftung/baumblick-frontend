# [1.0.0-staging.9](https://github.com/technologiestiftung/baumblick-frontend/compare/v1.0.0-staging.8...v1.0.0-staging.9) (2023-01-16)


### Bug Fixes

* **useFeedbackData:** Fix function formatDate that returned a month too early ([4069803](https://github.com/technologiestiftung/baumblick-frontend/commit/4069803fad7d1e5b48e4306a178de984f5851843))


### Features

* **api:** Remove token retrieval via login ([68c6ceb](https://github.com/technologiestiftung/baumblick-frontend/commit/68c6ceb4473ddd3b3dfa5ee586c80789142e1c14))
* **postgrestjs:** Add posgrest js client ([4f103aa](https://github.com/technologiestiftung/baumblick-frontend/commit/4f103aa1a0e85d7057d4149903a2676a5111d18e))

# [1.0.0-staging.8](https://github.com/technologiestiftung/baumblick-frontend/compare/v1.0.0-staging.7...v1.0.0-staging.8) (2022-12-20)


### Features

* Add new images for issues ([a189712](https://github.com/technologiestiftung/baumblick-frontend/commit/a1897124e5e30067650692f1318d78a39d6ba431))

# [1.0.0-staging.7](https://github.com/technologiestiftung/treewatch-frontend/compare/v1.0.0-staging.6...v1.0.0-staging.7) (2022-09-21)


### Bug Fixes

* Use pathname instead of id in StoryLayout ([90709b2](https://github.com/technologiestiftung/treewatch-frontend/commit/90709b2726898a9ffa48678e3132bc644b66f18c))

# [1.0.0-staging.6](https://github.com/technologiestiftung/treewatch-frontend/compare/v1.0.0-staging.5...v1.0.0-staging.6) (2022-08-25)


### Bug Fixes

* Reintroduce page title in [id] ([c14bd45](https://github.com/technologiestiftung/treewatch-frontend/commit/c14bd45cf73e105cd976018d2852d6b4f672fb79))


### Features

* **TreesMap:** Instant navigation to tree ([9926a2e](https://github.com/technologiestiftung/treewatch-frontend/commit/9926a2eba34590342547b3f403f671a432888e9d))
* **TreeView:** Load trees on the client side so it feels quicker ([cc7aadd](https://github.com/technologiestiftung/treewatch-frontend/commit/cc7aadda3fe2fe127ceeeefd5d39d55cd73aaac8))

# [1.0.0-staging.5](https://github.com/technologiestiftung/treewatch-frontend/compare/v1.0.0-staging.4...v1.0.0-staging.5) (2022-08-25)


### Bug Fixes

* **QTREES-371:** fetch most recent nowcast data for tree ([eb5824e](https://github.com/technologiestiftung/treewatch-frontend/commit/eb5824e4f6a737e1e13fcc4e763491365e1b41f2))


### Features

* always return most recent row if there are duplicate type_id's ([eb1ed1c](https://github.com/technologiestiftung/treewatch-frontend/commit/eb1ed1c1f4c1ba26f2d734face96aa858ef6678f))
* make nowcast return data more robust ([db5608f](https://github.com/technologiestiftung/treewatch-frontend/commit/db5608fc33109780e8dd0176194f21d6cf6cd582))

# [1.0.0-staging.4](https://github.com/technologiestiftung/treewatch-frontend/compare/v1.0.0-staging.3...v1.0.0-staging.4) (2022-08-25)


### Bug Fixes

* typo ([64ffff4](https://github.com/technologiestiftung/treewatch-frontend/commit/64ffff47fc6861f66d8eb4b44fd742d59ea170f1))


### Features

* **ForecastViz:** Add Relative time indicator for half and end ([1a537f6](https://github.com/technologiestiftung/treewatch-frontend/commit/1a537f6e8973f7ed474d2dda0cef990977eb4151))
* **ForecastViz:** Combine now and forecast data and pass it to the viz ([836f803](https://github.com/technologiestiftung/treewatch-frontend/commit/836f80329de5fb38aa1f5e3fbdae12e42f4cfc00))
* **ForecastViz:** show it independently of forecast data ([398a48c](https://github.com/technologiestiftung/treewatch-frontend/commit/398a48c1e96f542257a3773f8b757073438017e2))
* **ForecastViz:** show today + next 14 days ([554d586](https://github.com/technologiestiftung/treewatch-frontend/commit/554d586db58f4240fa09907f2322926d9844c0f6))
* **QTREES-359:** ensure that we always show next 14 days in ForecastViz ([2d8a0dd](https://github.com/technologiestiftung/treewatch-frontend/commit/2d8a0dd9734a1d0ee9169a9d60fe5c68ab243ee1))

# [1.0.0-staging.3](https://github.com/technologiestiftung/treewatch-frontend/compare/v1.0.0-staging.2...v1.0.0-staging.3) (2022-08-24)


### Features

* **useRainData:** Add useRainData hook with data from API ([02fca85](https://github.com/technologiestiftung/treewatch-frontend/commit/02fca851effcecbae6c44b88fc17c64bf790b611))

# [1.0.0-staging.2](https://github.com/technologiestiftung/treewatch-frontend/compare/v1.0.0-staging.1...v1.0.0-staging.2) (2022-08-24)


### Bug Fixes

* **sql:** Fix query to get the last 14 days of values from ([019c800](https://github.com/technologiestiftung/treewatch-frontend/commit/019c800e817ed97d36109e0d1de4680da5f5c104))


### Features

* Add sum of all data to the results ([1135a29](https://github.com/technologiestiftung/treewatch-frontend/commit/1135a2940541766c4021d8cfa48db54d437c60f1))
* **rainfall:** Add api route to get rainfall data per tree ([6617bff](https://github.com/technologiestiftung/treewatch-frontend/commit/6617bff0b57e86e7724b9285914f4dc30b1dacfd))

# 1.0.0-staging.1 (2022-08-24)


### Bug Fixes

* Add Berliner to the first slide text ([5a12b5c](https://github.com/technologiestiftung/treewatch-frontend/commit/5a12b5c7e23b76ce1c36bbdcb703a412d3a2c4a3))
* Add protocol to VERCEL_URL in next config ([884fdf3](https://github.com/technologiestiftung/treewatch-frontend/commit/884fdf363d668b4840269f294997331de55d6a21))
* Add protocoll to VERCEL_URL ([dba9267](https://github.com/technologiestiftung/treewatch-frontend/commit/dba926720e2f23eeed4320f2211f897632563c98))
* Add scroll margin to headings in content for space under the header ([2195c39](https://github.com/technologiestiftung/treewatch-frontend/commit/2195c39e02eaba7bcfd0e8136264c5885abf07dd))
* apply new scale in several locations ([bb55631](https://github.com/technologiestiftung/treewatch-frontend/commit/bb55631787c3c801bf3356295e5298d33dbb4dcd))
* Apply review correction by [@dnsos](https://github.com/dnsos) ([a1fbd17](https://github.com/technologiestiftung/treewatch-frontend/commit/a1fbd17d4fadf7b4a48a943d136b1373f6ddb848))
* **Button:** bring back gradient colors ([2dc6962](https://github.com/technologiestiftung/treewatch-frontend/commit/2dc696288b604e0fcc4800a0b18712219b469096))
* cancel decounced router.replace when tree is clicked ([2a9a250](https://github.com/technologiestiftung/treewatch-frontend/commit/2a9a250767671040d0a68052d0068ca7d8d34819))
* **Carousel:** make sure nav dots are visible ([9db2546](https://github.com/technologiestiftung/treewatch-frontend/commit/9db25464cc26a6bc6031733fbdadfb3e3d2f2bdd))
* ci workflow should call secrets not env ([b9b551b](https://github.com/technologiestiftung/treewatch-frontend/commit/b9b551bc3e1121b1b51712eea43cb8e76fb36748))
* **ci:** Disable husky on CI ([f4679d6](https://github.com/technologiestiftung/treewatch-frontend/commit/f4679d632c20fd59e051115528bb3810fd689a06))
* do not preserve map queries on non-related routes ([0afb137](https://github.com/technologiestiftung/treewatch-frontend/commit/0afb137d3dd30703d15bab53a5d5a1a9d51724d2))
* Ensure scrollbar is always visible on desktop ([35400bf](https://github.com/technologiestiftung/treewatch-frontend/commit/35400bf3202737e20c22dab80f461491ad1e3f7d))
* ensure that feature state is only set with valid ID ([ce799b6](https://github.com/technologiestiftung/treewatch-frontend/commit/ce799b6db16319056f290b4d951728c9395beeab))
* **FeedbackReportForm:** Add loading effect to image ([5b71736](https://github.com/technologiestiftung/treewatch-frontend/commit/5b71736b7e765deefd863df8a5248744e9f77269))
* **FeedbackReportForm:** Fix layout of FeedbackReportForm ([d692e18](https://github.com/technologiestiftung/treewatch-frontend/commit/d692e186568e802e7b28936e3e07765b58347c9a))
* **FeedbackReportModal:** Fix border radius of modal ([53a788c](https://github.com/technologiestiftung/treewatch-frontend/commit/53a788cdd4f86ff59dabb66dd68b0b296ed4e04e))
* Fix focus styles and rounding of elements ([82fe3a5](https://github.com/technologiestiftung/treewatch-frontend/commit/82fe3a5fb294acf3088cbed58eb6f212490f4114))
* Fix icons colors ([7e942fc](https://github.com/technologiestiftung/treewatch-frontend/commit/7e942fcae95293e7ff8aecd3ff298f59fb7845ad))
* fix manifest color ([fef5cc0](https://github.com/technologiestiftung/treewatch-frontend/commit/fef5cc00979ee836747865d6395186f24348bf9c))
* Fix resize of map ([adf2719](https://github.com/technologiestiftung/treewatch-frontend/commit/adf2719bb159511a258e44c9f0d4cbe4123181b5))
* Fix responsive styles on mobile ([abeef60](https://github.com/technologiestiftung/treewatch-frontend/commit/abeef605a0af9f256724d6e04e6a4e04e33471d4))
* Fix some broken styles ([f717b03](https://github.com/technologiestiftung/treewatch-frontend/commit/f717b0360615636adc5ab8a88e5f573bc6142cb1))
* Fix some focus styles ([826df46](https://github.com/technologiestiftung/treewatch-frontend/commit/826df460390b6706f9b90356e4fa85513a7b457a))
* fix some typos and formatting ([012b097](https://github.com/technologiestiftung/treewatch-frontend/commit/012b097c886ce2cbae3d379a13d8fe894a922a98))
* Fix typo ([63adf84](https://github.com/technologiestiftung/treewatch-frontend/commit/63adf8421372dded2c3fcf5e51829f72c06574eb))
* Fix typos ([286cd9b](https://github.com/technologiestiftung/treewatch-frontend/commit/286cd9b455cd1b05f71a42733a73807ef4edfae3))
* **getForecastData:** Use getBaseUrl in getForecastData ([d1be71a](https://github.com/technologiestiftung/treewatch-frontend/commit/d1be71ab55de4a8f686f610f11d3bb1e0e992679))
* give slider buttons more tap space ([1b7b564](https://github.com/technologiestiftung/treewatch-frontend/commit/1b7b5648f61a9aaeb9a295b546de57159c5c2e80))
* **HomeSlider:** fix buttons with ref (attempt) ([6a6dbec](https://github.com/technologiestiftung/treewatch-frontend/commit/6a6dbeca5a2a5ec24f63499a451440cc8b09dee8))
* **HomeSlider:** Fix grid layout of home page to avoid scroll ([22bc8ab](https://github.com/technologiestiftung/treewatch-frontend/commit/22bc8ab4c916c7d835e9d2191a1ff49443453da6))
* **HomeSlider:** Make sure images in the home slider always look right ([9ede672](https://github.com/technologiestiftung/treewatch-frontend/commit/9ede672b16e2ef1350bb4c67d61b90b050a1de04))
* **jest:** Mock AttributionControl in jest setup ([4323666](https://github.com/technologiestiftung/treewatch-frontend/commit/4323666baa0a5a2298c810e7efdccb3264e938f4))
* keep attributions visible ([c688c68](https://github.com/technologiestiftung/treewatch-frontend/commit/c688c68eb7c033339236ae96659e6cc9c40c8b45))
* **MainMenu:** Highlight 2nd tab when individual tree ([79b8e08](https://github.com/technologiestiftung/treewatch-frontend/commit/79b8e0886238c2e137797c8e966906a317c8f67d))
* make home button clickable again ([76c7e02](https://github.com/technologiestiftung/treewatch-frontend/commit/76c7e027f1fe37917e16e83aa09de9b2f57f6e65))
* make MapLibre work in non-browser test environment ([a188c31](https://github.com/technologiestiftung/treewatch-frontend/commit/a188c3160d5723c5c01a9711502681fe10fea234))
* **Map:** Fix height of map (remove animation but ensure height is right on mobile) ([bf64aed](https://github.com/technologiestiftung/treewatch-frontend/commit/bf64aedc6e05a8dc5367c019497c3ed9e129f8a2))
* only replace path when on /trees route ([9d2c3c3](https://github.com/technologiestiftung/treewatch-frontend/commit/9d2c3c34189b37c033a22dc14354998932c85776))
* prevent "initial props" error ([ffa16a8](https://github.com/technologiestiftung/treewatch-frontend/commit/ffa16a831977c9c7c724db8b16ec481fa05e8729))
* **QTREES-347:** Fix scrollbar shiftig elements ([95e6944](https://github.com/technologiestiftung/treewatch-frontend/commit/95e69446df00d717d9173f7bb107a1985477cdeb))
* Reinstall typography plugin ([2e2f159](https://github.com/technologiestiftung/treewatch-frontend/commit/2e2f159cdd53b3af0a4af953c4f7888e17f2361c))
* Remove comas fogotten in the markup ([63ef84f](https://github.com/technologiestiftung/treewatch-frontend/commit/63ef84ff01323691892902d6cff6a07b62d443b5))
* render custom dots without custom component ([3a6a4a0](https://github.com/technologiestiftung/treewatch-frontend/commit/3a6a4a06717739361ce645cefda24f34ee30b983))
* Replace dot in tree Id in URL to avoid problem ([420c34e](https://github.com/technologiestiftung/treewatch-frontend/commit/420c34e91e52fc455e9438885e7d155a4fe20aff))
* rollback to qtrees.ai URL ([64fff6e](https://github.com/technologiestiftung/treewatch-frontend/commit/64fff6ea2ec59561fce2db75428af47975ba7bda))
* **search:** Fix old icon in search ([eff29ac](https://github.com/technologiestiftung/treewatch-frontend/commit/eff29ac055a102db026cc46f08d481ae2f050842))
* show average label in data list ([4c3bad3](https://github.com/technologiestiftung/treewatch-frontend/commit/4c3bad33f67bd351daf61d5aeff7168041cdc543))
* **TableOfContents:** Make sure the table of contents initially renders ([882b264](https://github.com/technologiestiftung/treewatch-frontend/commit/882b264a5baa0ad0804f1255919c66b76afa2810))
* use correct scale for TOC ([f429756](https://github.com/technologiestiftung/treewatch-frontend/commit/f42975623ed78241f7200adcb4182ece80441933))
* use correct viewport height ([ea51013](https://github.com/technologiestiftung/treewatch-frontend/commit/ea51013496834297a74f625be49cf010cb97f59f))
* Use secrets in build.yml instead of env ([713f10e](https://github.com/technologiestiftung/treewatch-frontend/commit/713f10ea6dafd3566d63b8e4fdf16e3f37bb9f62))
* **WaterLevelLegend:** Made the number bold to reflect the circles labels ([f276cf5](https://github.com/technologiestiftung/treewatch-frontend/commit/f276cf59b35bb86a6b4a118cc408bc7861d56891))


### Features

* adapt home slider with new content ([c8f3455](https://github.com/technologiestiftung/treewatch-frontend/commit/c8f34559ae9846ea17026613b54bd6e526c2c629))
* adapt legend to new scale ([94d21c6](https://github.com/technologiestiftung/treewatch-frontend/commit/94d21c6817dee7ff8cb4c84e82f0fd34cb1a3fd6))
* add close section to tree page ([f7ec740](https://github.com/technologiestiftung/treewatch-frontend/commit/f7ec740c60aebe3813299c965988c21d68e30a33))
* Add first PoC using CSRF protection ([96e6926](https://github.com/technologiestiftung/treewatch-frontend/commit/96e6926f72bbbb53e7ea9b650b01b4318c1eb6b9))
* add first working map ([273ccaf](https://github.com/technologiestiftung/treewatch-frontend/commit/273ccaffa42d12139339d2583f13540a6adfcac1))
* add hover effect for trees ([bbee882](https://github.com/technologiestiftung/treewatch-frontend/commit/bbee8822c493409e9ccbbfb0975d1667a800295f))
* Add MainMenu component scaffold ([41eef2b](https://github.com/technologiestiftung/treewatch-frontend/commit/41eef2b3cbe34228fc4b0f670a8d5e83a42c48ab))
* Add next-translate to add single source of truth for texts ([93f8564](https://github.com/technologiestiftung/treewatch-frontend/commit/93f856478438e954dfedabf80b19939aac3d5d30))
* add RootsIllustration ([cf2c113](https://github.com/technologiestiftung/treewatch-frontend/commit/cf2c113d142039f3f6d295a3bf0c970582f0fc42))
* Add Sticky scrolling to individual tree page ([5744946](https://github.com/technologiestiftung/treewatch-frontend/commit/57449464cd4611a00b02bba2b56fb43ce0732d44))
* add stub for tree select ([7b578ff](https://github.com/technologiestiftung/treewatch-frontend/commit/7b578ff234157def3c31345286813e6e62698680))
* adjust mapping fiunction for new reduced scale ([c851f30](https://github.com/technologiestiftung/treewatch-frontend/commit/c851f305d08999dd1739aa5d3f32fe074865045c))
* **API:** Unify return values of routes ([605ead3](https://github.com/technologiestiftung/treewatch-frontend/commit/605ead3526e6dc4c4e0d9563b1efc77b7e605280))
* **Branding:** Add logo ([c9af5f1](https://github.com/technologiestiftung/treewatch-frontend/commit/c9af5f16ba6622e2414d7889dbebe7e7d8748970))
* **Button:** Add button component ([1c2bbfc](https://github.com/technologiestiftung/treewatch-frontend/commit/1c2bbfc058287d44d96b40044f2a9d690047f856))
* create nowcast to scale mapping ([7503bed](https://github.com/technologiestiftung/treewatch-frontend/commit/7503bedaa72220fc3f6f2819c7303393a2fdc55f))
* create request for tree base data ([1ece5d7](https://github.com/technologiestiftung/treewatch-frontend/commit/1ece5d71ff4ad2b532f73089e45fab7bd3fc92bd))
* create TreeInfoHeader component ([e1ab1c2](https://github.com/technologiestiftung/treewatch-frontend/commit/e1ab1c25374b8ae0247dc066250de4730c8ad4c7))
* **DataListItem:** Add DataListItem component ([205fbca](https://github.com/technologiestiftung/treewatch-frontend/commit/205fbcaeb81377a0108ba4c9db3274f7a2e92221))
* **db api:** Add api route to postgrest ([e107f6a](https://github.com/technologiestiftung/treewatch-frontend/commit/e107f6a94f33eacc272daa9f1a96e4660ba281b0)), closes [#46](https://github.com/technologiestiftung/treewatch-frontend/issues/46)
* display nowcast timestamp, value, and type ([490a7fa](https://github.com/technologiestiftung/treewatch-frontend/commit/490a7faa01f647166d12a9414185a3d16f0bf7f7))
* display tree data in page ([4745a08](https://github.com/technologiestiftung/treewatch-frontend/commit/4745a08d51b31b23e6e7ce21a5202b3ffd011da5))
* display tree genus in head ([0646cd7](https://github.com/technologiestiftung/treewatch-frontend/commit/0646cd78f7f478d76b77059cbf983515cdfaea59))
* display trees map (in incorrectly named RefreshmentMap) ([3192c75](https://github.com/technologiestiftung/treewatch-frontend/commit/3192c756936b671b0a9028e1461fb25b8e683ab2))
* display water legend in MapLayout ([83f365c](https://github.com/technologiestiftung/treewatch-frontend/commit/83f365cb6c024d92b4524a08ac331dff4dbc4d62))
* do not show compass in map controls ([885a484](https://github.com/technologiestiftung/treewatch-frontend/commit/885a484a1b072c4a59832b658ac5febfa111bd25))
* fallback to gray if tree prop for styling doesn't exist ([6b03066](https://github.com/technologiestiftung/treewatch-frontend/commit/6b03066de53fb6bdfc9e9867a5e9bae1d3f513d3))
* **favicon:** Replace favicons with new branding ([ff710d6](https://github.com/technologiestiftung/treewatch-frontend/commit/ff710d6263ad6c984834f804907f71606f7ea617))
* **FeedbackReportForm:** Create presentational component FeedbackReportForm ([5cc8004](https://github.com/technologiestiftung/treewatch-frontend/commit/5cc8004d3b51ab5e21d0cf2e02553e877d4bb8d7))
* **FeedbackReportModal:** Add presentational component FeedbackReportModal ([5c1f3bd](https://github.com/technologiestiftung/treewatch-frontend/commit/5c1f3bd6d3bb1ba7a4597576c2279db2e19348b7))
* **FeedbackReportModal:** Integrate Modal with data ([05d746f](https://github.com/technologiestiftung/treewatch-frontend/commit/05d746f738b9404eb47e78573577d6a2e18ea4a2))
* **FeedbackRequestsList:** Use useFeedbackData hook with components ([8dea97e](https://github.com/technologiestiftung/treewatch-frontend/commit/8dea97e4e1a5ed797a3ad2725320f2833608b28f))
* fetch only latest 4 nowcast values for a tree ([613c181](https://github.com/technologiestiftung/treewatch-frontend/commit/613c1816e25122ea182aac81db6086a655fc1b48))
* fetch tree base data in /trees/[id] route ([dd8fef0](https://github.com/technologiestiftung/treewatch-frontend/commit/dd8fef0d8c36535136ee9ae9949d7bd98e2d63b5))
* fly to selected tree ([d1c74da](https://github.com/technologiestiftung/treewatch-frontend/commit/d1c74da945e2118996d3ea5b7a092bbe84c2f6fe))
* **ForecastViz:** create viz and add with sample data to page ([c77efc4](https://github.com/technologiestiftung/treewatch-frontend/commit/c77efc40793fcdc37b38d814675db7e7c3309d4d))
* **GPSButton:** Add geolocalisation to button on home ([028fc79](https://github.com/technologiestiftung/treewatch-frontend/commit/028fc79e4e76214a2a12f02fc5b5403480f05c0c))
* **Header:** Add Header Components ([72cf6a4](https://github.com/technologiestiftung/treewatch-frontend/commit/72cf6a4e250665ec41229b409a13f838cf79713a))
* **Headline:** Add Headline component ([96a37a0](https://github.com/technologiestiftung/treewatch-frontend/commit/96a37a0ed5f43c95d666163c6e4ad65bc45417ed))
* highlight selected tree (WIP) ([84d6405](https://github.com/technologiestiftung/treewatch-frontend/commit/84d640518f4df86716b18d4e5b75b67957d22b36))
* **Home:** Add CTA and legal links ([423edc0](https://github.com/technologiestiftung/treewatch-frontend/commit/423edc049287630171bff12dca06ca5847f616cf))
* **Home:** Add slider fundaments for home page ([08fe826](https://github.com/technologiestiftung/treewatch-frontend/commit/08fe8268b2c7f54ff32db702ca8dbddf4a196680))
* **Home:** Add textFormatting possibilities ([7b6b0d9](https://github.com/technologiestiftung/treewatch-frontend/commit/7b6b0d9ca3958d31b8a3e7ee339261a2836d28d6))
* **HomeSlider:** Add CTA Slide ([b8dcd4f](https://github.com/technologiestiftung/treewatch-frontend/commit/b8dcd4fe0cbca22818557b42511671487980d97e))
* **HomeSlider:** Add image contents to home slider ([a0f0c17](https://github.com/technologiestiftung/treewatch-frontend/commit/a0f0c17a69ffb293eb6789922b6ee9ab02367a02))
* **HomeSlider:** Add WaterLevelLegend in the first slide ([543af73](https://github.com/technologiestiftung/treewatch-frontend/commit/543af73515a9705ea152e7506b6920c00abda898))
* **Icons:** Add all icons ([e833779](https://github.com/technologiestiftung/treewatch-frontend/commit/e8337796b367c36d557babbac821b7b2b9718122))
* **Icons:** Add all icons ([b07bb3b](https://github.com/technologiestiftung/treewatch-frontend/commit/b07bb3b3a16f2225c67a1d994471caac6a18cb96))
* **Icons:** Add duotone Icons ([cbef3a2](https://github.com/technologiestiftung/treewatch-frontend/commit/cbef3a2cd9e76dc1d4d99cafcd75d18825e9f477))
* implement new scale (WIP) ([d186261](https://github.com/technologiestiftung/treewatch-frontend/commit/d186261239c3f9d1c7d669a30e9d156c524cf6db))
* improve aria-labels ([53c0b90](https://github.com/technologiestiftung/treewatch-frontend/commit/53c0b90bb289b82c6aff564334f123454b16b43b))
* include base64-encoded nav icons ([2435c2f](https://github.com/technologiestiftung/treewatch-frontend/commit/2435c2fe9a8243b9ca07f4783b02a9a61e25bca5))
* increase stroke-width when tree circle is selected ([6400fc8](https://github.com/technologiestiftung/treewatch-frontend/commit/6400fc8e1330fa01ee5d6606968967db18cce2ed))
* **issues api:** Adds working example to call issues api ([c91123e](https://github.com/technologiestiftung/treewatch-frontend/commit/c91123e23ff356880a5ed59446558cebfe3a2e65))
* **issues api:** Adds working example to call issues api ([b38132a](https://github.com/technologiestiftung/treewatch-frontend/commit/b38132a11a94990135e410f70d0e0e772af85dd0))
* **LeadParagraph:** Add component LeadParagraph ([8a0dffa](https://github.com/technologiestiftung/treewatch-frontend/commit/8a0dffa076a5e135265b8153c2f0263c8822281d))
* make legend clickable on tree page ([b7683e2](https://github.com/technologiestiftung/treewatch-frontend/commit/b7683e249d3d094812b22472e9e503017da87e46))
* move trees that don't have nowcast data below ones that do ([61504be](https://github.com/technologiestiftung/treewatch-frontend/commit/61504bec31e06d5f4c529b99d4144182c58bb0c2))
* **Paragraph:** Add Paragraph component ([8d1fcee](https://github.com/technologiestiftung/treewatch-frontend/commit/8d1fcee8ffdad1985f230285eb82df496bcc6d70))
* pass selected tree through to map ([1567490](https://github.com/technologiestiftung/treewatch-frontend/commit/156749084fc0749585c399eea0744dca8b4cdd82))
* provide hook for fetching nowcast data ([bdb78e6](https://github.com/technologiestiftung/treewatch-frontend/commit/bdb78e6abb527f047986baac74b878fd985eef05))
* **QTREE-369:** Add confirmation to FeedbackReportForm ([9b6c37a](https://github.com/technologiestiftung/treewatch-frontend/commit/9b6c37adf346bee798a2dd9c2f7ce1cfc6859eed))
* **QTREES-277:** create TreeProperty component ([cd67695](https://github.com/technologiestiftung/treewatch-frontend/commit/cd676958704f983344c1d98fa9d0c65eea8035e5))
* **QTREES-277:** make map and detail view work with each other ([4b69672](https://github.com/technologiestiftung/treewatch-frontend/commit/4b69672a775ec3961928927f44eda6f52f52942a))
* **QTREES-280:** create legend component (correct arrow missing) ([f24dd40](https://github.com/technologiestiftung/treewatch-frontend/commit/f24dd4082d5a584b767c561c1d2c59c6f4d21c80))
* **QTREES-280:** display water level legend in map ([631b804](https://github.com/technologiestiftung/treewatch-frontend/commit/631b804c715bfd10067aed666ab9ea5780e827ce))
* **QTREES-280:** improve legend styles ([55d7515](https://github.com/technologiestiftung/treewatch-frontend/commit/55d7515abc7b97f8c6f69c349cee76d439ee2c25))
* **QTREES-280:** move legend to top of screen ([a0152b7](https://github.com/technologiestiftung/treewatch-frontend/commit/a0152b71b7329d94e941700673b70d43fdccb1af))
* **QTREES-280:** roate arrows to make more sense ([66b0407](https://github.com/technologiestiftung/treewatch-frontend/commit/66b040798356dfd7e5817000a49cce7f2b97ce1c))
* **QTREES-280:** use icons for collapse/expand ([b31ff13](https://github.com/technologiestiftung/treewatch-frontend/commit/b31ff134bfa21996f784ffb75bb0b29aa87f88a7))
* **QTREES-362:** access forecast data via hook ([293a9d3](https://github.com/technologiestiftung/treewatch-frontend/commit/293a9d3b745c9b9c2f470f1bf61b9461c037ad1f))
* **QTREES-362:** ensure we fetch consecutive forecast data (ascending) ([5fd6c3d](https://github.com/technologiestiftung/treewatch-frontend/commit/5fd6c3d39eab560bb8ca0cb838c089f0ff735353))
* **QTREES-365:** use carousel in tree page (WIP) ([70666b9](https://github.com/technologiestiftung/treewatch-frontend/commit/70666b9fa51f5605c79c34c0d67737c778232e0c))
* **QTREES-366:** add axes and axes labels ([d21526b](https://github.com/technologiestiftung/treewatch-frontend/commit/d21526b8ea3a8c08f24cb04b4ef4790290ba2d0b))
* **QTREES-366:** add option for empty chart ([16ad475](https://github.com/technologiestiftung/treewatch-frontend/commit/16ad475745b30c534d4ab62740af8d2aa32d5b45))
* **QTREES-366:** create forecast barchart component (WIP) ([9b547e2](https://github.com/technologiestiftung/treewatch-frontend/commit/9b547e29e263532385ed07655253a547df82b00b))
* **QTREES-366:** display date on x-axis ([750570c](https://github.com/technologiestiftung/treewatch-frontend/commit/750570c7bb58f90ab321ba621c303f9b7a8a8392))
* **QTREES-366:** highlight today if today is included in data ([cda21b1](https://github.com/technologiestiftung/treewatch-frontend/commit/cda21b1c0793c46cbe9b26aaad04f8c70d7c1581))
* refine circle radii for high zoom levels ([a80f9c9](https://github.com/technologiestiftung/treewatch-frontend/commit/a80f9c9365d196377864456f91c95cb96ff9fcaf))
* show geolocate control for map ([be34fed](https://github.com/technologiestiftung/treewatch-frontend/commit/be34fed09c758b9aaf1f28142b9e9e286a508589))
* show proper map attributions ([e440720](https://github.com/technologiestiftung/treewatch-frontend/commit/e440720a098001d6f1dfc0db4b298a2db87a9523))
* **social-image:** Update social-image ([acb4c40](https://github.com/technologiestiftung/treewatch-frontend/commit/acb4c402901d83b7bdbf7d5bad32e69714560ddb))
* **SoilLayersViz:** create basic component ([573321f](https://github.com/technologiestiftung/treewatch-frontend/commit/573321f62e9ed39cd0a1197ed8072ebb7baf1d71))
* **StoriesOverviewHeader:** Add StoriesOverviewHeader component ([87dea10](https://github.com/technologiestiftung/treewatch-frontend/commit/87dea10a176d63672ec38774a70199841f753ba3))
* **StoryLayout:** Add StoryLayout ([ed3e5e8](https://github.com/technologiestiftung/treewatch-frontend/commit/ed3e5e889ab797b80baf5c8d330d41f069044673))
* **StoryLink:** Add Stories Overview page and StoryLink component ([ba2af2d](https://github.com/technologiestiftung/treewatch-frontend/commit/ba2af2dbd55323158d2c6d90d0c49b1b1b0a2e04))
* **StoryStickyHeader:** Add progress indication to StoryStickyHeader ([a6bd410](https://github.com/technologiestiftung/treewatch-frontend/commit/a6bd410b36cf94f1f219de60426dd5b229c57de9))
* stub out display of nowcast data ([f272afd](https://github.com/technologiestiftung/treewatch-frontend/commit/f272afda36c7918bd0ee794772f299b4714ce660))
* stub out tree infos ([05d8c6c](https://github.com/technologiestiftung/treewatch-frontend/commit/05d8c6c45cd87f1c67d314ac62795db8296b0216))
* **TableOfContents:** Add sticky TOC with header and toggle button ([d69fe58](https://github.com/technologiestiftung/treewatch-frontend/commit/d69fe589dff1a8d418b7ddb16db776d2db349bef))
* **TableOfContents:** Add TableOfContents component ([41e9060](https://github.com/technologiestiftung/treewatch-frontend/commit/41e9060b795332bd61613c8518aa7353d4c2ceb2))
* **TableOfContents:** Rendering the TableOfContents dynamically into the story ([45839e0](https://github.com/technologiestiftung/treewatch-frontend/commit/45839e00a1403e0fda4b1a2a6c8ea78c74bc2f2c))
* **Tabs:** Add pure tabs component ([fda75b4](https://github.com/technologiestiftung/treewatch-frontend/commit/fda75b4f30cd4abd42cc8454298362449104c0f7))
* **Tabs:** Add Tabs to tree view with placeholder content ([62ce4da](https://github.com/technologiestiftung/treewatch-frontend/commit/62ce4da59d74f550fd82c8630a603399ed5e2d7e))
* **TreeContextMenu:** Add TreeContextMenu with Share modal ([ceee490](https://github.com/technologiestiftung/treewatch-frontend/commit/ceee49084d12f85c89ac1e8fdae770855bf2022b))
* **TreeInfoHeader:** Add sticky TreeInfoHeader into tree view ([d94b7b5](https://github.com/technologiestiftung/treewatch-frontend/commit/d94b7b5f808c691332f9262ab18885a50a7c7030))
* **TreeInfoHeader:** enable adding additional classes ([c133db6](https://github.com/technologiestiftung/treewatch-frontend/commit/c133db6c5b7ba34d7e8a560f963845837673e6bc))
* **treesLayer:** Add layer for number in tree map ([da74b25](https://github.com/technologiestiftung/treewatch-frontend/commit/da74b253eecf7859c3a13547955dc2723ceb940e))
* update home carousel images ([b983386](https://github.com/technologiestiftung/treewatch-frontend/commit/b98338632b2a4acea5ccb6ce5bb4e25a20e0bdde))
* use gml_id for tree ID in URL ([79949b2](https://github.com/technologiestiftung/treewatch-frontend/commit/79949b237b45a38849440fefaa7985a6818cb1b0))
* use Saugspannung average value for tree dot color ([63762f2](https://github.com/technologiestiftung/treewatch-frontend/commit/63762f25e0bff64fb4eaf46b902656a851d0e4ab))
* use TreeInfo Header in page ([db67764](https://github.com/technologiestiftung/treewatch-frontend/commit/db677645155d7537c95614f58d9ed93adeb4b295))
* use viz in tree page ([ae356e7](https://github.com/technologiestiftung/treewatch-frontend/commit/ae356e7c11d3393fda4a1e02bf3438db27235642))
* **useFeedbackData:** Add useFeedbackData hook (Must be tested with data) ([baac71d](https://github.com/technologiestiftung/treewatch-frontend/commit/baac71dc2faef6178ec0c6677f8b1e04e84f89f6))
* **WaterLevelLegend:** Add numbers to legend ([ea4c1d3](https://github.com/technologiestiftung/treewatch-frontend/commit/ea4c1d3b28a0ee928e3793f6b612c08562f39471))
* zoom to map in top area ([399f689](https://github.com/technologiestiftung/treewatch-frontend/commit/399f6890af229023da060bd3a294643365367821))


### Reverts

* bring back darkend Tailwind colors ([82b91b2](https://github.com/technologiestiftung/treewatch-frontend/commit/82b91b2532a45852ecd8db872a64553724d45cc6))
