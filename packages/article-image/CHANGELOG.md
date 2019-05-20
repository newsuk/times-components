# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [7.1.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@7.1.4...@times-components/article-image@7.1.5) (2019-05-20)

**Note:** Version bump only for package @times-components/article-image





## [7.1.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@7.1.3...@times-components/article-image@7.1.4) (2019-05-17)

**Note:** Version bump only for package @times-components/article-image





## [7.1.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@7.1.2...@times-components/article-image@7.1.3) (2019-05-16)

**Note:** Version bump only for package @times-components/article-image





## [7.1.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@7.1.1...@times-components/article-image@7.1.2) (2019-05-16)


### Bug Fixes

* hide placeholders for puzzle slices ([#1955](https://github.com/newsuk/times-components/issues/1955)) ([534ba09](https://github.com/newsuk/times-components/commit/534ba09))





## [7.1.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@7.1.0...@times-components/article-image@7.1.1) (2019-05-16)

**Note:** Version bump only for package @times-components/article-image





# [7.1.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@7.0.2...@times-components/article-image@7.1.0) (2019-05-15)


### Features

* full width images on web ([#1954](https://github.com/newsuk/times-components/issues/1954)) ([adbdcdc](https://github.com/newsuk/times-components/commit/adbdcdc))





## [7.0.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@7.0.1...@times-components/article-image@7.0.2) (2019-05-15)

**Note:** Version bump only for package @times-components/article-image





## [7.0.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@7.0.0...@times-components/article-image@7.0.1) (2019-05-14)

**Note:** Version bump only for package @times-components/article-image





# [7.0.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@6.0.10...@times-components/article-image@7.0.0) (2019-05-14)


* BREAKING CHANGE fix: image performance (#1927) ([5d366fa](https://github.com/newsuk/times-components/commit/5d366fa)), closes [#1927](https://github.com/newsuk/times-components/issues/1927)


### BREAKING CHANGES

* fix: don't hide placeholders once image is loaded to prevent fade

* fix: improve performance of placeholder component

* fix: don't show placeholder when low res image is used as placeholder
* chore: remove onImageLayout and use native layout

* chore: use accurate aspect ratios in tests

* chore: remove unnecessary contrain module

* fix: do not show low res placeholder if same size as high res image

* fix: don't require layout to show T logo on native

* fix: only show low res placeholder if different to high res

* fix: restore hiding placeholder onload. Disable android fading

* fix: do not require onlayout to render images on web

* feat: use screen width as high res size on modal images to improve time to load

* feat: add cross platform fade back

* fix: always show low res placeholder as now necessary for the e fade

* chore: snaps

* fix: do not fade in the t image

* fix: more resiliant hiding of placeholders once image has loaded

* fix: clear timer on unmounted images
* fix: remove unused borderRadius & fix rounded prop with placeholder

* chore: snaps





## [6.0.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@6.0.9...@times-components/article-image@6.0.10) (2019-05-14)

**Note:** Version bump only for package @times-components/article-image





## [6.0.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@6.0.8...@times-components/article-image@6.0.9) (2019-05-09)


### Bug Fixes

* remove tile view container border radius styles ([#1915](https://github.com/newsuk/times-components/issues/1915)) ([8d21d51](https://github.com/newsuk/times-components/commit/8d21d51))





## [6.0.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@6.0.7...@times-components/article-image@6.0.8) (2019-05-09)

**Note:** Version bump only for package @times-components/article-image





## [6.0.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@6.0.6...@times-components/article-image@6.0.7) (2019-05-08)

**Note:** Version bump only for package @times-components/article-image





## [6.0.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@6.0.5...@times-components/article-image@6.0.6) (2019-05-03)

**Note:** Version bump only for package @times-components/article-image





## [6.0.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@6.0.4...@times-components/article-image@6.0.5) (2019-05-03)

**Note:** Version bump only for package @times-components/article-image





## [6.0.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@6.0.3...@times-components/article-image@6.0.4) (2019-05-01)

**Note:** Version bump only for package @times-components/article-image





## [6.0.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@6.0.2...@times-components/article-image@6.0.3) (2019-05-01)

**Note:** Version bump only for package @times-components/article-image





## [6.0.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@6.0.1...@times-components/article-image@6.0.2) (2019-04-30)

**Note:** Version bump only for package @times-components/article-image





## [6.0.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@6.0.0...@times-components/article-image@6.0.1) (2019-04-30)

**Note:** Version bump only for package @times-components/article-image





# [6.0.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.25...@times-components/article-image@6.0.0) (2019-04-29)


* BREAKING CHANGE feat: manage meta tags in times-components  (#1897) ([e2dffc8](https://github.com/newsuk/times-components/commit/e2dffc8)), closes [#1897](https://github.com/newsuk/times-components/issues/1897)


### BREAKING CHANGES

* feat: add makeTopicUrl

* feat: move existing topic render tags over to times-components

* feat: move existing author-profile render tags over to times-components

* feat: move exmost article render tags over to times-components

* chore: snaps

* fix: usde short headline if headline not available

* fix: deps

* fix: lint

* fix: lint

* chore: article url should be consistent with topic url





## [5.1.25](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.24...@times-components/article-image@5.1.25) (2019-04-24)

**Note:** Version bump only for package @times-components/article-image





## [5.1.24](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.23...@times-components/article-image@5.1.24) (2019-04-18)

**Note:** Version bump only for package @times-components/article-image





## [5.1.23](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.22...@times-components/article-image@5.1.23) (2019-04-18)

**Note:** Version bump only for package @times-components/article-image





## [5.1.22](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.21...@times-components/article-image@5.1.22) (2019-04-17)


### Bug Fixes

* ios article image press ([#1884](https://github.com/newsuk/times-components/issues/1884)) ([5240718](https://github.com/newsuk/times-components/commit/5240718))





## [5.1.21](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.18...@times-components/article-image@5.1.21) (2019-04-15)

**Note:** Version bump only for package @times-components/article-image





## [5.1.20](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.18...@times-components/article-image@5.1.20) (2019-04-15)

**Note:** Version bump only for package @times-components/article-image





## [5.1.19](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.18...@times-components/article-image@5.1.19) (2019-04-15)

**Note:** Version bump only for package @times-components/article-image





## [5.1.18](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.17...@times-components/article-image@5.1.18) (2019-04-12)

**Note:** Version bump only for package @times-components/article-image





## [5.1.17](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.16...@times-components/article-image@5.1.17) (2019-04-12)

**Note:** Version bump only for package @times-components/article-image





## [5.1.16](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.15...@times-components/article-image@5.1.16) (2019-04-12)

**Note:** Version bump only for package @times-components/article-image





## [5.1.15](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.14...@times-components/article-image@5.1.15) (2019-04-12)

**Note:** Version bump only for package @times-components/article-image





## [5.1.14](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.13...@times-components/article-image@5.1.14) (2019-04-11)

**Note:** Version bump only for package @times-components/article-image





## [5.1.13](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.12...@times-components/article-image@5.1.13) (2019-04-11)

**Note:** Version bump only for package @times-components/article-image





## [5.1.12](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.11...@times-components/article-image@5.1.12) (2019-04-11)

**Note:** Version bump only for package @times-components/article-image





## [5.1.11](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.10...@times-components/article-image@5.1.11) (2019-04-10)

**Note:** Version bump only for package @times-components/article-image





## [5.1.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.9...@times-components/article-image@5.1.10) (2019-04-09)

**Note:** Version bump only for package @times-components/article-image





## [5.1.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.8...@times-components/article-image@5.1.9) (2019-04-09)

**Note:** Version bump only for package @times-components/article-image





## [5.1.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.7...@times-components/article-image@5.1.8) (2019-04-09)

**Note:** Version bump only for package @times-components/article-image





## [5.1.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.6...@times-components/article-image@5.1.7) (2019-04-08)

**Note:** Version bump only for package @times-components/article-image





## [5.1.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.5...@times-components/article-image@5.1.6) (2019-04-08)

**Note:** Version bump only for package @times-components/article-image





## [5.1.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.4...@times-components/article-image@5.1.5) (2019-04-05)

**Note:** Version bump only for package @times-components/article-image





## [5.1.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.3...@times-components/article-image@5.1.4) (2019-04-05)

**Note:** Version bump only for package @times-components/article-image





## [5.1.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.2...@times-components/article-image@5.1.3) (2019-04-05)

**Note:** Version bump only for package @times-components/article-image





## [5.1.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.1...@times-components/article-image@5.1.2) (2019-04-05)

**Note:** Version bump only for package @times-components/article-image





## [5.1.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.1.0...@times-components/article-image@5.1.1) (2019-04-04)

**Note:** Version bump only for package @times-components/article-image





# [5.1.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.0.5...@times-components/article-image@5.1.0) (2019-04-03)


### Features

* gather data for image gallery ([#1835](https://github.com/newsuk/times-components/issues/1835)) ([52508b8](https://github.com/newsuk/times-components/commit/52508b8))





## [5.0.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.0.4...@times-components/article-image@5.0.5) (2019-04-02)

**Note:** Version bump only for package @times-components/article-image





## [5.0.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.0.3...@times-components/article-image@5.0.4) (2019-04-02)

**Note:** Version bump only for package @times-components/article-image





## [5.0.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.0.2...@times-components/article-image@5.0.3) (2019-04-01)

**Note:** Version bump only for package @times-components/article-image





## [5.0.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.0.1...@times-components/article-image@5.0.2) (2019-04-01)

**Note:** Version bump only for package @times-components/article-image





## [5.0.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@5.0.0...@times-components/article-image@5.0.1) (2019-04-01)

**Note:** Version bump only for package @times-components/article-image





# [5.0.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.14...@times-components/article-image@5.0.0) (2019-03-25)


### Features

* modal images elements should never overlay the image & captions should always be left aligned.  ([#1804](https://github.com/newsuk/times-components/issues/1804)) ([5cc5c1b](https://github.com/newsuk/times-components/commit/5cc5c1b))


### BREAKING CHANGES

* remove renderModalCaption from article-lead-asset as it is now always left aligned

* chore: remove renderModalCaption from the templates

* chore: clean up image placeholder & tests

* chore: floor T dimensions for perf

* chore: simplify tree

* chore: simplify styles

* chore: safer-area-view tests

* chore: tests & linting

* chore: fix web placeholder

* chore: web snapshots

* chore: web snapshots

* chore: PR fixes

* chore: improve code coverage





## [4.8.14](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.13...@times-components/article-image@4.8.14) (2019-03-15)


### Bug Fixes

* portrait images in modals ([#1800](https://github.com/newsuk/times-components/issues/1800)) ([73f62b2](https://github.com/newsuk/times-components/commit/73f62b2))





## [4.8.13](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.12...@times-components/article-image@4.8.13) (2019-03-14)

**Note:** Version bump only for package @times-components/article-image





## [4.8.12](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.11...@times-components/article-image@4.8.12) (2019-03-14)

**Note:** Version bump only for package @times-components/article-image





## [4.8.11](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.10...@times-components/article-image@4.8.11) (2019-03-13)

**Note:** Version bump only for package @times-components/article-image





## [4.8.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.9...@times-components/article-image@4.8.10) (2019-03-13)

**Note:** Version bump only for package @times-components/article-image





## [4.8.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.8...@times-components/article-image@4.8.9) (2019-03-12)

**Note:** Version bump only for package @times-components/article-image





## [4.8.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.7...@times-components/article-image@4.8.8) (2019-03-12)


### Bug Fixes

* update max width so that gutters do not show on landscape iPad Pro 11" ([#1793](https://github.com/newsuk/times-components/issues/1793)) ([a0fef36](https://github.com/newsuk/times-components/commit/a0fef36))





## [4.8.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.6...@times-components/article-image@4.8.7) (2019-03-12)

**Note:** Version bump only for package @times-components/article-image





## [4.8.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.5...@times-components/article-image@4.8.6) (2019-03-06)

**Note:** Version bump only for package @times-components/article-image





## [4.8.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.4...@times-components/article-image@4.8.5) (2019-03-05)

**Note:** Version bump only for package @times-components/article-image





## [4.8.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.3...@times-components/article-image@4.8.4) (2019-03-01)

**Note:** Version bump only for package @times-components/article-image





## [4.8.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.2...@times-components/article-image@4.8.3) (2019-03-01)

**Note:** Version bump only for package @times-components/article-image





## [4.8.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.1...@times-components/article-image@4.8.2) (2019-02-28)

**Note:** Version bump only for package @times-components/article-image





## [4.8.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.8.0...@times-components/article-image@4.8.1) (2019-02-25)

**Note:** Version bump only for package @times-components/article-image





# [4.8.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.7.10...@times-components/article-image@4.8.0) (2019-02-25)


### Bug Fixes

* web - image component hides placeholder and loads images smoothly ([#1736](https://github.com/newsuk/times-components/issues/1736)) ([e4210e3](https://github.com/newsuk/times-components/commit/e4210e3))


### Features

* primary image captions center aligned on indepth articles ([#1740](https://github.com/newsuk/times-components/issues/1740)) ([226d20a](https://github.com/newsuk/times-components/commit/226d20a))





## [4.7.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.7.9...@times-components/article-image@4.7.10) (2019-02-20)

**Note:** Version bump only for package @times-components/article-image





## [4.7.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.7.8...@times-components/article-image@4.7.9) (2019-02-20)

**Note:** Version bump only for package @times-components/article-image





## [4.7.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.7.7...@times-components/article-image@4.7.8) (2019-02-19)

**Note:** Version bump only for package @times-components/article-image





## [4.7.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.7.6...@times-components/article-image@4.7.7) (2019-02-18)

**Note:** Version bump only for package @times-components/article-image





## [4.7.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.7.5...@times-components/article-image@4.7.6) (2019-02-18)

**Note:** Version bump only for package @times-components/article-image





## [4.7.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.7.4...@times-components/article-image@4.7.5) (2019-02-18)

**Note:** Version bump only for package @times-components/article-image





## [4.7.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.7.3...@times-components/article-image@4.7.4) (2019-02-18)

**Note:** Version bump only for package @times-components/article-image





## [4.7.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.7.2...@times-components/article-image@4.7.3) (2019-02-18)

**Note:** Version bump only for package @times-components/article-image





## [4.7.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.7.1...@times-components/article-image@4.7.2) (2019-02-15)

**Note:** Version bump only for package @times-components/article-image





## [4.7.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.7.0...@times-components/article-image@4.7.1) (2019-02-15)

**Note:** Version bump only for package @times-components/article-image





# [4.7.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.13...@times-components/article-image@4.7.0) (2019-02-14)


### Features

* fullwidth image spacing ([#1695](https://github.com/newsuk/times-components/issues/1695)) ([8b8e6cb](https://github.com/newsuk/times-components/commit/8b8e6cb))





## [4.6.13](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.12...@times-components/article-image@4.6.13) (2019-02-13)

**Note:** Version bump only for package @times-components/article-image





## [4.6.12](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.11...@times-components/article-image@4.6.12) (2019-02-13)

**Note:** Version bump only for package @times-components/article-image





## [4.6.11](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.10...@times-components/article-image@4.6.11) (2019-02-13)

**Note:** Version bump only for package @times-components/article-image





## [4.6.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.9...@times-components/article-image@4.6.10) (2019-02-13)


### Bug Fixes

* add horizontal padding to the centred caption ([#1683](https://github.com/newsuk/times-components/issues/1683)) ([b1ea387](https://github.com/newsuk/times-components/commit/b1ea387))





## [4.6.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.8...@times-components/article-image@4.6.9) (2019-02-12)

**Note:** Version bump only for package @times-components/article-image





## [4.6.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.7...@times-components/article-image@4.6.8) (2019-02-07)

**Note:** Version bump only for package @times-components/article-image





## [4.6.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.6...@times-components/article-image@4.6.7) (2019-02-07)

**Note:** Version bump only for package @times-components/article-image





## [4.6.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.5...@times-components/article-image@4.6.6) (2019-02-06)

**Note:** Version bump only for package @times-components/article-image





## [4.6.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.4...@times-components/article-image@4.6.5) (2019-02-04)

**Note:** Version bump only for package @times-components/article-image





## [4.6.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.3...@times-components/article-image@4.6.4) (2019-02-04)

**Note:** Version bump only for package @times-components/article-image





## [4.6.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.1...@times-components/article-image@4.6.3) (2019-02-04)

**Note:** Version bump only for package @times-components/article-image





## [4.6.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.1...@times-components/article-image@4.6.2) (2019-02-04)

**Note:** Version bump only for package @times-components/article-image





## [4.6.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.6.0...@times-components/article-image@4.6.1) (2019-02-04)

**Note:** Version bump only for package @times-components/article-image





# [4.6.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.5.0...@times-components/article-image@4.6.0) (2019-02-01)


### Features

* Left align caption and credits on tablet body images ([#1649](https://github.com/newsuk/times-components/issues/1649)) ([e48c873](https://github.com/newsuk/times-components/commit/e48c873))





# [4.5.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.4.7...@times-components/article-image@4.5.0) (2019-02-01)


### Features

* fullwidth image display type ([#1653](https://github.com/newsuk/times-components/issues/1653)) ([94ddf86](https://github.com/newsuk/times-components/commit/94ddf86))





## [4.4.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.4.6...@times-components/article-image@4.4.7) (2019-01-30)


### Bug Fixes

* versions ([#1651](https://github.com/newsuk/times-components/issues/1651)) ([c57f1de](https://github.com/newsuk/times-components/commit/c57f1de))





## [4.4.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.4.5...@times-components/article-image@4.4.6) (2019-01-30)

**Note:** Version bump only for package @times-components/article-image





## [4.4.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.4.4...@times-components/article-image@4.4.5) (2019-01-29)

**Note:** Version bump only for package @times-components/article-image





## [4.4.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.4.3...@times-components/article-image@4.4.4) (2019-01-28)

**Note:** Version bump only for package @times-components/article-image





## [4.4.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.4.2...@times-components/article-image@4.4.3) (2019-01-25)

**Note:** Version bump only for package @times-components/article-image





## [4.4.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.4.1...@times-components/article-image@4.4.2) (2019-01-25)

**Note:** Version bump only for package @times-components/article-image





## [4.4.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.4.0...@times-components/article-image@4.4.1) (2019-01-24)

**Note:** Version bump only for package @times-components/article-image





# [4.4.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.3.0...@times-components/article-image@4.4.0) (2019-01-23)


### Features

* REPLAT-4853 article max width ([#1613](https://github.com/newsuk/times-components/issues/1613)) ([f800d9a](https://github.com/newsuk/times-components/commit/f800d9a))





# [4.3.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.2.4...@times-components/article-image@4.3.0) (2019-01-22)


### Features

* key facts tablet layout ([#1612](https://github.com/newsuk/times-components/issues/1612)) ([0793a0a](https://github.com/newsuk/times-components/commit/0793a0a))





## [4.2.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.2.3...@times-components/article-image@4.2.4) (2019-01-17)

**Note:** Version bump only for package @times-components/article-image





## [4.2.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.2.2...@times-components/article-image@4.2.3) (2019-01-15)

**Note:** Version bump only for package @times-components/article-image





## [4.2.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.2.1...@times-components/article-image@4.2.2) (2019-01-14)

**Note:** Version bump only for package @times-components/article-image





## [4.2.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.2.0...@times-components/article-image@4.2.1) (2019-01-08)

**Note:** Version bump only for package @times-components/article-image





# [4.2.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.31...@times-components/article-image@4.2.0) (2019-01-04)


### Features

* lead asset package  ([#1552](https://github.com/newsuk/times-components/issues/1552)) ([cfc346a](https://github.com/newsuk/times-components/commit/cfc346a))





## [4.1.31](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.30...@times-components/article-image@4.1.31) (2019-01-03)

**Note:** Version bump only for package @times-components/article-image





## [4.1.30](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.29...@times-components/article-image@4.1.30) (2018-12-18)

**Note:** Version bump only for package @times-components/article-image





## [4.1.29](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.28...@times-components/article-image@4.1.29) (2018-12-13)

**Note:** Version bump only for package @times-components/article-image





## [4.1.28](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.27...@times-components/article-image@4.1.28) (2018-12-12)

**Note:** Version bump only for package @times-components/article-image





## [4.1.27](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.26...@times-components/article-image@4.1.27) (2018-12-12)

**Note:** Version bump only for package @times-components/article-image





## [4.1.26](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.25...@times-components/article-image@4.1.26) (2018-12-06)

**Note:** Version bump only for package @times-components/article-image





## [4.1.25](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.24...@times-components/article-image@4.1.25) (2018-12-04)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.24"></a>
## [4.1.24](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.23...@times-components/article-image@4.1.24) (2018-12-03)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.23"></a>
## [4.1.23](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.22...@times-components/article-image@4.1.23) (2018-11-28)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.22"></a>
## [4.1.22](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.21...@times-components/article-image@4.1.22) (2018-11-28)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.21"></a>
## [4.1.21](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.20...@times-components/article-image@4.1.21) (2018-11-27)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.20"></a>
## [4.1.20](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.19...@times-components/article-image@4.1.20) (2018-11-26)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.19"></a>
## [4.1.19](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.18...@times-components/article-image@4.1.19) (2018-11-26)


### Bug Fixes

* replat 4405 design review ([#1509](https://github.com/newsuk/times-components/issues/1509)) ([aa5a40d](https://github.com/newsuk/times-components/commit/aa5a40d))





<a name="4.1.18"></a>
## [4.1.18](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.17...@times-components/article-image@4.1.18) (2018-11-21)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.17"></a>
## [4.1.17](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.16...@times-components/article-image@4.1.17) (2018-11-21)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.16"></a>
## [4.1.16](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.15...@times-components/article-image@4.1.16) (2018-11-20)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.15"></a>
## [4.1.15](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.14...@times-components/article-image@4.1.15) (2018-11-19)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.14"></a>
## [4.1.14](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.13...@times-components/article-image@4.1.14) (2018-11-15)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.13"></a>
## [4.1.13](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.12...@times-components/article-image@4.1.13) (2018-11-13)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.12"></a>
## [4.1.12](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.11...@times-components/article-image@4.1.12) (2018-11-12)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.11"></a>
## [4.1.11](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.10...@times-components/article-image@4.1.11) (2018-11-12)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.10"></a>
## [4.1.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.9...@times-components/article-image@4.1.10) (2018-11-09)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.9"></a>
## [4.1.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.8...@times-components/article-image@4.1.9) (2018-11-07)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.8"></a>
## [4.1.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.7...@times-components/article-image@4.1.8) (2018-11-06)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.7"></a>
## [4.1.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.6...@times-components/article-image@4.1.7) (2018-11-01)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.6"></a>
## [4.1.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.5...@times-components/article-image@4.1.6) (2018-10-31)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.5"></a>
## [4.1.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.4...@times-components/article-image@4.1.5) (2018-10-25)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.4"></a>
## [4.1.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.1...@times-components/article-image@4.1.4) (2018-10-23)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.3"></a>
## [4.1.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.1...@times-components/article-image@4.1.3) (2018-10-19)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.2"></a>
## [4.1.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.1...@times-components/article-image@4.1.2) (2018-10-16)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.1"></a>
## [4.1.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.1.0...@times-components/article-image@4.1.1) (2018-10-12)

**Note:** Version bump only for package @times-components/article-image





<a name="4.1.0"></a>
# [4.1.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.13...@times-components/article-image@4.1.0) (2018-10-11)


### Features

* add lazy load to article ([#1387](https://github.com/newsuk/times-components/issues/1387)) ([cd05e83](https://github.com/newsuk/times-components/commit/cd05e83))





<a name="4.0.13"></a>
## [4.0.13](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.12...@times-components/article-image@4.0.13) (2018-10-06)

**Note:** Version bump only for package @times-components/article-image





<a name="4.0.12"></a>
## [4.0.12](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.11...@times-components/article-image@4.0.12) (2018-10-03)

**Note:** Version bump only for package @times-components/article-image





<a name="4.0.11"></a>
## [4.0.11](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.10...@times-components/article-image@4.0.11) (2018-10-02)

**Note:** Version bump only for package @times-components/article-image





<a name="4.0.10"></a>
## [4.0.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.9...@times-components/article-image@4.0.10) (2018-09-28)

**Note:** Version bump only for package @times-components/article-image





<a name="4.0.9"></a>
## [4.0.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.8...@times-components/article-image@4.0.9) (2018-09-28)

**Note:** Version bump only for package @times-components/article-image





<a name="4.0.8"></a>
## [4.0.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.7...@times-components/article-image@4.0.8) (2018-09-27)

**Note:** Version bump only for package @times-components/article-image





<a name="4.0.7"></a>
## [4.0.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.6...@times-components/article-image@4.0.7) (2018-09-26)

**Note:** Version bump only for package @times-components/article-image





<a name="4.0.6"></a>
## [4.0.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.5...@times-components/article-image@4.0.6) (2018-09-21)

**Note:** Version bump only for package @times-components/article-image





<a name="4.0.5"></a>
## [4.0.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.4...@times-components/article-image@4.0.5) (2018-09-20)

**Note:** Version bump only for package @times-components/article-image





<a name="4.0.4"></a>
## [4.0.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.3...@times-components/article-image@4.0.4) (2018-09-18)

**Note:** Version bump only for package @times-components/article-image





<a name="4.0.3"></a>
## [4.0.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.2...@times-components/article-image@4.0.3) (2018-09-13)

**Note:** Version bump only for package @times-components/article-image





<a name="4.0.2"></a>
## [4.0.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.1...@times-components/article-image@4.0.2) (2018-09-13)

**Note:** Version bump only for package @times-components/article-image





<a name="4.0.1"></a>
## [4.0.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@4.0.0...@times-components/article-image@4.0.1) (2018-09-11)

**Note:** Version bump only for package @times-components/article-image





<a name="4.0.0"></a>
# [4.0.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.18...@times-components/article-image@4.0.0) (2018-09-07)


* BREAKING CHANGE: split out high and low res images (#1299) ([cf128dd](https://github.com/newsuk/times-components/commit/cf128dd)), closes [#1299](https://github.com/newsuk/times-components/issues/1299)


### BREAKING CHANGES

* split out high and low res images
* refactor: split out fade-in effect
* chore: fix meta
* fix: no observer SSR





<a name="3.2.18"></a>
## [3.2.18](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.17...@times-components/article-image@3.2.18) (2018-09-06)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.17"></a>
## [3.2.17](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.16...@times-components/article-image@3.2.17) (2018-09-04)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.16"></a>
## [3.2.16](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.15...@times-components/article-image@3.2.16) (2018-09-03)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.15"></a>
## [3.2.15](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.14...@times-components/article-image@3.2.15) (2018-08-31)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.14"></a>
## [3.2.14](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.13...@times-components/article-image@3.2.14) (2018-08-29)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.13"></a>
## [3.2.13](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.12...@times-components/article-image@3.2.13) (2018-08-29)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.12"></a>
## [3.2.12](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.11...@times-components/article-image@3.2.12) (2018-08-24)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.11"></a>
## [3.2.11](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.10...@times-components/article-image@3.2.11) (2018-08-24)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.10"></a>
## [3.2.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.9...@times-components/article-image@3.2.10) (2018-08-24)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.9"></a>
## [3.2.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.8...@times-components/article-image@3.2.9) (2018-08-24)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.8"></a>
## [3.2.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.7...@times-components/article-image@3.2.8) (2018-08-23)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.7"></a>
## [3.2.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.6...@times-components/article-image@3.2.7) (2018-08-23)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.6"></a>
## [3.2.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.5...@times-components/article-image@3.2.6) (2018-08-22)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.5"></a>
## [3.2.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.4...@times-components/article-image@3.2.5) (2018-08-22)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.4"></a>
## [3.2.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.3...@times-components/article-image@3.2.4) (2018-08-21)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.3"></a>
## [3.2.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.2...@times-components/article-image@3.2.3) (2018-08-17)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.2"></a>
## [3.2.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.1...@times-components/article-image@3.2.2) (2018-08-17)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.1"></a>
## [3.2.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.2.0...@times-components/article-image@3.2.1) (2018-08-16)

**Note:** Version bump only for package @times-components/article-image





<a name="3.2.0"></a>
# [3.2.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.1.9...@times-components/article-image@3.2.0) (2018-08-16)


### Features

* add semantic elements ([#1213](https://github.com/newsuk/times-components/issues/1213)) ([d8391c0](https://github.com/newsuk/times-components/commit/d8391c0))





<a name="3.1.9"></a>
## [3.1.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.1.8...@times-components/article-image@3.1.9) (2018-08-15)

**Note:** Version bump only for package @times-components/article-image





<a name="3.1.8"></a>
## [3.1.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.1.7...@times-components/article-image@3.1.8) (2018-08-14)

**Note:** Version bump only for package @times-components/article-image





<a name="3.1.7"></a>
## [3.1.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.1.6...@times-components/article-image@3.1.7) (2018-08-14)

**Note:** Version bump only for package @times-components/article-image





<a name="3.1.6"></a>
## [3.1.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.1.5...@times-components/article-image@3.1.6) (2018-08-14)

**Note:** Version bump only for package @times-components/article-image





<a name="3.1.5"></a>
## [3.1.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.1.4...@times-components/article-image@3.1.5) (2018-08-13)

**Note:** Version bump only for package @times-components/article-image





<a name="3.1.4"></a>
## [3.1.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.1.3...@times-components/article-image@3.1.4) (2018-08-13)

**Note:** Version bump only for package @times-components/article-image





<a name="3.1.3"></a>
## [3.1.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.1.2...@times-components/article-image@3.1.3) (2018-08-10)


### Bug Fixes

* Allow test:all at root to run synchronously. ([#1202](https://github.com/newsuk/times-components/issues/1202)) ([74b044d](https://github.com/newsuk/times-components/commit/74b044d))




<a name="3.1.2"></a>
## [3.1.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.1.1...@times-components/article-image@3.1.2) (2018-08-10)




**Note:** Version bump only for package @times-components/article-image

<a name="3.1.1"></a>
## [3.1.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.1.0...@times-components/article-image@3.1.1) (2018-08-10)




**Note:** Version bump only for package @times-components/article-image

<a name="3.1.0"></a>
# [3.1.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.0.2...@times-components/article-image@3.1.0) (2018-08-10)


### Features

* add caption data to modal images ([#1193](https://github.com/newsuk/times-components/issues/1193)) ([29a2b62](https://github.com/newsuk/times-components/commit/29a2b62))




<a name="3.0.2"></a>
## [3.0.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.0.1...@times-components/article-image@3.0.2) (2018-08-09)




**Note:** Version bump only for package @times-components/article-image

<a name="3.0.1"></a>
## [3.0.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@3.0.0...@times-components/article-image@3.0.1) (2018-08-09)




**Note:** Version bump only for package @times-components/article-image

<a name="3.0.0"></a>
# [3.0.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.1.1...@times-components/article-image@3.0.0) (2018-08-09)


### Features

* split out packages and clean up deps ([#1183](https://github.com/newsuk/times-components/issues/1183)) ([85aca6b](https://github.com/newsuk/times-components/commit/85aca6b))


### BREAKING CHANGES

* split up markup into separate packages




<a name="2.1.1"></a>
## [2.1.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.1.0...@times-components/article-image@2.1.1) (2018-08-07)




**Note:** Version bump only for package @times-components/article-image

<a name="2.1.0"></a>
# [2.1.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.15...@times-components/article-image@2.1.0) (2018-08-07)


### Features

* add depcheck and cleanup ([#1169](https://github.com/newsuk/times-components/issues/1169)) ([b5c058c](https://github.com/newsuk/times-components/commit/b5c058c))




<a name="2.0.15"></a>
## [2.0.15](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.14...@times-components/article-image@2.0.15) (2018-08-06)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.14"></a>
## [2.0.14](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.13...@times-components/article-image@2.0.14) (2018-08-06)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.13"></a>
## [2.0.13](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.12...@times-components/article-image@2.0.13) (2018-08-06)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.12"></a>
## [2.0.12](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.11...@times-components/article-image@2.0.12) (2018-08-02)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.11"></a>
## [2.0.11](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.10...@times-components/article-image@2.0.11) (2018-08-02)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.10"></a>
## [2.0.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.9...@times-components/article-image@2.0.10) (2018-07-31)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.9"></a>
## [2.0.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.8...@times-components/article-image@2.0.9) (2018-07-31)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.8"></a>
## [2.0.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.7...@times-components/article-image@2.0.8) (2018-07-26)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.7"></a>
## [2.0.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.6...@times-components/article-image@2.0.7) (2018-07-26)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.6"></a>
## [2.0.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.5...@times-components/article-image@2.0.6) (2018-07-25)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.5"></a>
## [2.0.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.4...@times-components/article-image@2.0.5) (2018-07-25)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.4"></a>
## [2.0.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.3...@times-components/article-image@2.0.4) (2018-07-24)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.3"></a>
## [2.0.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.2...@times-components/article-image@2.0.3) (2018-07-23)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.2"></a>
## [2.0.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.1...@times-components/article-image@2.0.2) (2018-07-23)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.1"></a>
## [2.0.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@2.0.0...@times-components/article-image@2.0.1) (2018-07-20)




**Note:** Version bump only for package @times-components/article-image

<a name="2.0.0"></a>
# 2.0.0 (2018-07-18)


### Bug Fixes

* add left padding for primary inline image for mob web and native ([6487884](https://github.com/newsuk/times-components/commit/6487884))
* allow storybook-native debugging by upgrading react native ([#673](https://github.com/newsuk/times-components/issues/673)) ([2228d33](https://github.com/newsuk/times-components/commit/2228d33))
* android dextrose ([#569](https://github.com/newsuk/times-components/issues/569)) ([b5b74fa](https://github.com/newsuk/times-components/commit/b5b74fa))
* apply new dextrose ([#651](https://github.com/newsuk/times-components/issues/651)) ([ca586ee](https://github.com/newsuk/times-components/commit/ca586ee))
* dextrose ([#919](https://github.com/newsuk/times-components/issues/919)) ([a8fa1d4](https://github.com/newsuk/times-components/commit/a8fa1d4))
* do not publish on npm settings files ([#848](https://github.com/newsuk/times-components/issues/848)) ([a1df7f3](https://github.com/newsuk/times-components/commit/a1df7f3))
* fix the broken storybook addon by updating storybook. ([#583](https://github.com/newsuk/times-components/issues/583)) ([6056e00](https://github.com/newsuk/times-components/commit/6056e00))
* Fix the layout when greater than 2 Device Pixel Ratio is used ([#789](https://github.com/newsuk/times-components/issues/789)) ([3192c4a](https://github.com/newsuk/times-components/commit/3192c4a))
* ignore package.json ([#295](https://github.com/newsuk/times-components/issues/295)) ([3614c6e](https://github.com/newsuk/times-components/commit/3614c6e))
* make react-native-web a peer ([#470](https://github.com/newsuk/times-components/issues/470)) ([334208c](https://github.com/newsuk/times-components/commit/334208c))
* prettier to ignore native code ([#296](https://github.com/newsuk/times-components/issues/296)) ([d6d24ed](https://github.com/newsuk/times-components/commit/d6d24ed))
* REPLAT-1166 Responsive Article Patterns ([#500](https://github.com/newsuk/times-components/issues/500)) ([873a16e](https://github.com/newsuk/times-components/commit/873a16e))
* resolve article tech debt ([#446](https://github.com/newsuk/times-components/issues/446)) ([4ff6a6b](https://github.com/newsuk/times-components/commit/4ff6a6b))
* typo in grouping name ([#656](https://github.com/newsuk/times-components/issues/656)) ([680296c](https://github.com/newsuk/times-components/commit/680296c))
* use ImageBackground wrapped in View ([#399](https://github.com/newsuk/times-components/issues/399)) ([e77bcde](https://github.com/newsuk/times-components/commit/e77bcde))


### Features

* add article loading state ([#324](https://github.com/newsuk/times-components/issues/324)) ([b2c07fe](https://github.com/newsuk/times-components/commit/b2c07fe))
* add expo ([#860](https://github.com/newsuk/times-components/issues/860)) ([d8edd0b](https://github.com/newsuk/times-components/commit/d8edd0b))
* add images to article ([#249](https://github.com/newsuk/times-components/issues/249)) ([0387409](https://github.com/newsuk/times-components/commit/0387409))
* add json files to lint and fmt ([#274](https://github.com/newsuk/times-components/issues/274)) ([f008b0f](https://github.com/newsuk/times-components/commit/f008b0f))
* colours in styleguide for all packages ([#707](https://github.com/newsuk/times-components/issues/707)) ([d62bb1b](https://github.com/newsuk/times-components/commit/d62bb1b))
* image resizing ([#861](https://github.com/newsuk/times-components/issues/861)) ([73bb820](https://github.com/newsuk/times-components/commit/73bb820))
* make article responsive ([#421](https://github.com/newsuk/times-components/issues/421)) ([3c2aaf7](https://github.com/newsuk/times-components/commit/3c2aaf7))
* make rnw bundles ([#958](https://github.com/newsuk/times-components/issues/958)) ([c412a57](https://github.com/newsuk/times-components/commit/c412a57))
* omit function prop values from snapshots ([#994](https://github.com/newsuk/times-components/issues/994)) ([6050e4e](https://github.com/newsuk/times-components/commit/6050e4e))
* refactor storybook package ([#453](https://github.com/newsuk/times-components/issues/453)) ([acadef3](https://github.com/newsuk/times-components/commit/acadef3))
* REPLAT-602 Add Pull Quotes ([#469](https://github.com/newsuk/times-components/issues/469)) ([b2ac5a0](https://github.com/newsuk/times-components/commit/b2ac5a0))
* responsive inline images ([#518](https://github.com/newsuk/times-components/issues/518)) ([ed90802](https://github.com/newsuk/times-components/commit/ed90802))
* Styleguide - Spacing ([#774](https://github.com/newsuk/times-components/issues/774)) ([5b22303](https://github.com/newsuk/times-components/commit/5b22303))
* support preview images on Android ([#480](https://github.com/newsuk/times-components/issues/480)) ([0840dd8](https://github.com/newsuk/times-components/commit/0840dd8))
* updating to latest tc ([#924](https://github.com/newsuk/times-components/issues/924)) ([e294cd2](https://github.com/newsuk/times-components/commit/e294cd2))
* use ART for SVGs (REPLAT-2285) ([#1009](https://github.com/newsuk/times-components/issues/1009)) ([795cb3f](https://github.com/newsuk/times-components/commit/795cb3f))
* use Yarn Workspaces ([55a7b88](https://github.com/newsuk/times-components/commit/55a7b88))


* breaking change: compose serializers (#1029) ([2e45d57](https://github.com/newsuk/times-components/commit/2e45d57)), closes [#1029](https://github.com/newsuk/times-components/issues/1029)


### BREAKING CHANGES

* add options object to jest-configurator
* feat: hoist dev specific rnw styles in snapshots a la styled components
* feat: remove empty values from snapshots e.g. stickyHeaderIndices
* feat: web retains className even if empty and native does not
* chore: remove coverage flags from test scripts
* chore: bump enzyme-to-json




<a name="1.0.15"></a>
## [1.0.15](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.14...@times-components/article-image@1.0.15) (2018-07-11)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.14"></a>
## [1.0.14](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.13...@times-components/article-image@1.0.14) (2018-07-10)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.13"></a>
## [1.0.13](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.12...@times-components/article-image@1.0.13) (2018-07-09)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.12"></a>
## [1.0.12](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.11...@times-components/article-image@1.0.12) (2018-07-07)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.11"></a>
## [1.0.11](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.10...@times-components/article-image@1.0.11) (2018-07-06)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.10"></a>
## [1.0.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.9...@times-components/article-image@1.0.10) (2018-07-03)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.9"></a>
## [1.0.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.8...@times-components/article-image@1.0.9) (2018-07-03)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.8"></a>
## [1.0.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.7...@times-components/article-image@1.0.8) (2018-07-02)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.7"></a>
## [1.0.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.6...@times-components/article-image@1.0.7) (2018-07-02)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.6"></a>
## [1.0.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.5...@times-components/article-image@1.0.6) (2018-06-29)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.5"></a>
## [1.0.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.4...@times-components/article-image@1.0.5) (2018-06-27)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.4"></a>
## [1.0.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.3...@times-components/article-image@1.0.4) (2018-06-22)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.3"></a>
## [1.0.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.2...@times-components/article-image@1.0.3) (2018-06-20)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.2"></a>
## [1.0.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.1...@times-components/article-image@1.0.2) (2018-06-20)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.1"></a>
## [1.0.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@1.0.0...@times-components/article-image@1.0.1) (2018-06-19)




**Note:** Version bump only for package @times-components/article-image

<a name="1.0.0"></a>
# [1.0.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.19.0...@times-components/article-image@1.0.0) (2018-06-15)


* breaking change: compose serializers (#1029) ([2e45d57](https://github.com/newsuk/times-components/commit/2e45d57)), closes [#1029](https://github.com/newsuk/times-components/issues/1029)


### BREAKING CHANGES

* add options object to jest-configurator
* feat: hoist dev specific rnw styles in snapshots a la styled components
* feat: remove empty values from snapshots e.g. stickyHeaderIndices
* feat: web retains className even if empty and native does not
* chore: remove coverage flags from test scripts
* chore: bump enzyme-to-json




<a name="0.19.0"></a>
# [0.19.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.18.2...@times-components/article-image@0.19.0) (2018-06-13)


### Features

* use ART for SVGs (REPLAT-2285) ([#1009](https://github.com/newsuk/times-components/issues/1009)) ([795cb3f](https://github.com/newsuk/times-components/commit/795cb3f))




<a name="0.18.2"></a>
## [0.18.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.18.1...@times-components/article-image@0.18.2) (2018-06-13)




**Note:** Version bump only for package @times-components/article-image

<a name="0.18.1"></a>
## [0.18.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.18.0...@times-components/article-image@0.18.1) (2018-06-07)




**Note:** Version bump only for package @times-components/article-image

<a name="0.18.0"></a>
# [0.18.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.17.7...@times-components/article-image@0.18.0) (2018-06-07)


### Features

* omit function prop values from snapshots ([#994](https://github.com/newsuk/times-components/issues/994)) ([6050e4e](https://github.com/newsuk/times-components/commit/6050e4e))




<a name="0.17.7"></a>
## [0.17.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.17.6...@times-components/article-image@0.17.7) (2018-06-06)




**Note:** Version bump only for package @times-components/article-image

<a name="0.17.6"></a>
## [0.17.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.17.5...@times-components/article-image@0.17.6) (2018-06-04)




**Note:** Version bump only for package @times-components/article-image

<a name="0.17.5"></a>
## [0.17.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.17.4...@times-components/article-image@0.17.5) (2018-06-04)




**Note:** Version bump only for package @times-components/article-image

<a name="0.17.4"></a>
## [0.17.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.17.3...@times-components/article-image@0.17.4) (2018-06-04)




**Note:** Version bump only for package @times-components/article-image

<a name="0.17.3"></a>
## [0.17.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.17.2...@times-components/article-image@0.17.3) (2018-05-31)




**Note:** Version bump only for package @times-components/article-image

<a name="0.17.2"></a>
## [0.17.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.17.0...@times-components/article-image@0.17.2) (2018-05-30)




**Note:** Version bump only for package @times-components/article-image

<a name="0.17.0"></a>
# [0.17.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.16.7...@times-components/article-image@0.17.0) (2018-05-29)


### Features

* make rnw bundles ([#958](https://github.com/newsuk/times-components/issues/958)) ([c412a57](https://github.com/newsuk/times-components/commit/c412a57))




<a name="0.16.7"></a>
## [0.16.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.16.6...@times-components/article-image@0.16.7) (2018-05-29)




**Note:** Version bump only for package @times-components/article-image

<a name="0.16.6"></a>
## [0.16.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.16.5...@times-components/article-image@0.16.6) (2018-05-25)




**Note:** Version bump only for package @times-components/article-image

<a name="0.16.5"></a>
## [0.16.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.16.4...@times-components/article-image@0.16.5) (2018-05-25)




**Note:** Version bump only for package @times-components/article-image

<a name="0.16.4"></a>
## [0.16.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.16.3...@times-components/article-image@0.16.4) (2018-05-25)




**Note:** Version bump only for package @times-components/article-image

<a name="0.16.3"></a>
## [0.16.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.16.2...@times-components/article-image@0.16.3) (2018-05-23)




**Note:** Version bump only for package @times-components/article-image

<a name="0.16.2"></a>
## [0.16.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.16.1...@times-components/article-image@0.16.2) (2018-05-21)




**Note:** Version bump only for package @times-components/article-image

<a name="0.16.1"></a>
## [0.16.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.16.0...@times-components/article-image@0.16.1) (2018-05-21)




**Note:** Version bump only for package @times-components/article-image

<a name="0.16.0"></a>
# [0.16.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.15.12...@times-components/article-image@0.16.0) (2018-05-15)


### Features

* updating to latest tc ([#924](https://github.com/newsuk/times-components/issues/924)) ([e294cd2](https://github.com/newsuk/times-components/commit/e294cd2))




<a name="0.15.12"></a>
## [0.15.12](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.15.11...@times-components/article-image@0.15.12) (2018-05-15)




**Note:** Version bump only for package @times-components/article-image

<a name="0.15.11"></a>
## [0.15.11](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.15.10...@times-components/article-image@0.15.11) (2018-05-14)




**Note:** Version bump only for package @times-components/article-image

<a name="0.15.10"></a>
## [0.15.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.15.9...@times-components/article-image@0.15.10) (2018-05-10)




**Note:** Version bump only for package @times-components/article-image

<a name="0.15.9"></a>
## [0.15.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.15.8...@times-components/article-image@0.15.9) (2018-05-08)




**Note:** Version bump only for package @times-components/article-image

<a name="0.15.8"></a>
## [0.15.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.15.7...@times-components/article-image@0.15.8) (2018-05-04)


### Bug Fixes

* dextrose ([#919](https://github.com/newsuk/times-components/issues/919)) ([a8fa1d4](https://github.com/newsuk/times-components/commit/a8fa1d4))




<a name="0.15.7"></a>
## [0.15.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.15.6...@times-components/article-image@0.15.7) (2018-05-01)




**Note:** Version bump only for package @times-components/article-image

<a name="0.15.6"></a>
## [0.15.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.15.5...@times-components/article-image@0.15.6) (2018-04-30)




**Note:** Version bump only for package @times-components/article-image

<a name="0.15.5"></a>
## [0.15.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.15.4...@times-components/article-image@0.15.5) (2018-04-30)




**Note:** Version bump only for package @times-components/article-image

<a name="0.15.4"></a>
## [0.15.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.15.3...@times-components/article-image@0.15.4) (2018-04-26)




**Note:** Version bump only for package @times-components/article-image

<a name="0.15.3"></a>
## [0.15.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.15.2...@times-components/article-image@0.15.3) (2018-04-26)




**Note:** Version bump only for package @times-components/article-image

<a name="0.15.2"></a>
## [0.15.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.15.1...@times-components/article-image@0.15.2) (2018-04-25)




**Note:** Version bump only for package @times-components/article-image

<a name="0.15.1"></a>
## [0.15.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.15.0...@times-components/article-image@0.15.1) (2018-04-24)




**Note:** Version bump only for package @times-components/article-image

<a name="0.15.0"></a>
# [0.15.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.14.3...@times-components/article-image@0.15.0) (2018-04-24)


### Features

* image resizing ([#861](https://github.com/newsuk/times-components/issues/861)) ([73bb820](https://github.com/newsuk/times-components/commit/73bb820))




<a name="0.14.3"></a>
## [0.14.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.14.2...@times-components/article-image@0.14.3) (2018-04-23)




**Note:** Version bump only for package @times-components/article-image

<a name="0.14.2"></a>
## [0.14.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.14.1...@times-components/article-image@0.14.2) (2018-04-23)




**Note:** Version bump only for package @times-components/article-image

<a name="0.14.1"></a>
## [0.14.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.14.0...@times-components/article-image@0.14.1) (2018-04-19)




**Note:** Version bump only for package @times-components/article-image

<a name="0.14.0"></a>
# [0.14.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.27...@times-components/article-image@0.14.0) (2018-04-17)


### Features

* add expo ([#860](https://github.com/newsuk/times-components/issues/860)) ([d8edd0b](https://github.com/newsuk/times-components/commit/d8edd0b))




<a name="0.13.27"></a>
## [0.13.27](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.26...@times-components/article-image@0.13.27) (2018-04-16)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.26"></a>
## [0.13.26](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.25...@times-components/article-image@0.13.26) (2018-04-14)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.25"></a>
## [0.13.25](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.24...@times-components/article-image@0.13.25) (2018-04-14)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.24"></a>
## [0.13.24](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.23...@times-components/article-image@0.13.24) (2018-04-13)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.23"></a>
## [0.13.23](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.22...@times-components/article-image@0.13.23) (2018-04-13)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.22"></a>
## [0.13.22](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.21...@times-components/article-image@0.13.22) (2018-04-12)


### Bug Fixes

* do not publish on npm settings files ([#848](https://github.com/newsuk/times-components/issues/848)) ([a1df7f3](https://github.com/newsuk/times-components/commit/a1df7f3))




<a name="0.13.21"></a>
## [0.13.21](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.20...@times-components/article-image@0.13.21) (2018-04-12)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.20"></a>
## [0.13.20](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.19...@times-components/article-image@0.13.20) (2018-04-11)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.19"></a>
## [0.13.19](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.16...@times-components/article-image@0.13.19) (2018-04-10)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.18"></a>
## [0.13.18](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.16...@times-components/article-image@0.13.18) (2018-04-10)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.17"></a>
## [0.13.17](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.16...@times-components/article-image@0.13.17) (2018-04-10)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.16"></a>
## [0.13.16](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.15...@times-components/article-image@0.13.16) (2018-04-10)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.15"></a>
## [0.13.15](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.14...@times-components/article-image@0.13.15) (2018-04-10)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.14"></a>
## [0.13.14](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.13...@times-components/article-image@0.13.14) (2018-04-09)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.13"></a>
## [0.13.13](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.12...@times-components/article-image@0.13.13) (2018-04-09)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.12"></a>
## [0.13.12](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.11...@times-components/article-image@0.13.12) (2018-04-06)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.11"></a>
## [0.13.11](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.10...@times-components/article-image@0.13.11) (2018-04-06)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.10"></a>
## [0.13.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.9...@times-components/article-image@0.13.10) (2018-04-05)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.9"></a>
## [0.13.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.8...@times-components/article-image@0.13.9) (2018-04-05)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.8"></a>
## [0.13.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.7...@times-components/article-image@0.13.8) (2018-04-05)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.7"></a>
## [0.13.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.6...@times-components/article-image@0.13.7) (2018-04-05)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.6"></a>
## [0.13.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.5...@times-components/article-image@0.13.6) (2018-04-03)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.5"></a>
## [0.13.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.4...@times-components/article-image@0.13.5) (2018-04-03)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.4"></a>
## [0.13.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.3...@times-components/article-image@0.13.4) (2018-03-29)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.3"></a>
## [0.13.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.2...@times-components/article-image@0.13.3) (2018-03-28)


### Bug Fixes

* Fix the layout when greater than 2 Device Pixel Ratio is used ([#789](https://github.com/newsuk/times-components/issues/789)) ([3192c4a](https://github.com/newsuk/times-components/commit/3192c4a))




<a name="0.13.2"></a>
## [0.13.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.1...@times-components/article-image@0.13.2) (2018-03-27)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.1"></a>
## [0.13.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.13.0...@times-components/article-image@0.13.1) (2018-03-26)




**Note:** Version bump only for package @times-components/article-image

<a name="0.13.0"></a>
# [0.13.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.12.12...@times-components/article-image@0.13.0) (2018-03-26)


### Features

* Styleguide - Spacing ([#774](https://github.com/newsuk/times-components/issues/774)) ([5b22303](https://github.com/newsuk/times-components/commit/5b22303))




<a name="0.12.12"></a>
## [0.12.12](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.12.11...@times-components/article-image@0.12.12) (2018-03-22)




**Note:** Version bump only for package @times-components/article-image

<a name="0.12.11"></a>
## [0.12.11](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.12.10...@times-components/article-image@0.12.11) (2018-03-21)




**Note:** Version bump only for package @times-components/article-image

<a name="0.12.10"></a>
## [0.12.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.12.9...@times-components/article-image@0.12.10) (2018-03-20)




**Note:** Version bump only for package @times-components/article-image

<a name="0.12.9"></a>
## [0.12.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.12.7...@times-components/article-image@0.12.9) (2018-03-20)




**Note:** Version bump only for package @times-components/article-image

<a name="0.12.8"></a>
## [0.12.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.12.7...@times-components/article-image@0.12.8) (2018-03-20)




**Note:** Version bump only for package @times-components/article-image

<a name="0.12.7"></a>
## [0.12.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.12.6...@times-components/article-image@0.12.7) (2018-03-16)




**Note:** Version bump only for package @times-components/article-image

<a name="0.12.6"></a>
## [0.12.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.12.5...@times-components/article-image@0.12.6) (2018-03-16)




**Note:** Version bump only for package @times-components/article-image

<a name="0.12.5"></a>
## [0.12.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.12.4...@times-components/article-image@0.12.5) (2018-03-15)




**Note:** Version bump only for package @times-components/article-image

<a name="0.12.4"></a>
## [0.12.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.12.3...@times-components/article-image@0.12.4) (2018-03-14)




**Note:** Version bump only for package @times-components/article-image

<a name="0.12.3"></a>
## [0.12.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.12.2...@times-components/article-image@0.12.3) (2018-03-14)




**Note:** Version bump only for package @times-components/article-image

<a name="0.12.2"></a>
## [0.12.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.12.1...@times-components/article-image@0.12.2) (2018-03-12)




**Note:** Version bump only for package @times-components/article-image

<a name="0.12.1"></a>
## [0.12.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.12.0...@times-components/article-image@0.12.1) (2018-03-09)




**Note:** Version bump only for package @times-components/article-image

<a name="0.12.0"></a>
# [0.12.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.43...@times-components/article-image@0.12.0) (2018-03-09)


### Features

* colours in styleguide for all packages ([#707](https://github.com/newsuk/times-components/issues/707)) ([d62bb1b](https://github.com/newsuk/times-components/commit/d62bb1b))




<a name="0.11.43"></a>
## [0.11.43](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.42...@times-components/article-image@0.11.43) (2018-03-08)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.42"></a>
## [0.11.42](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.41...@times-components/article-image@0.11.42) (2018-03-06)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.41"></a>
## [0.11.41](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.40...@times-components/article-image@0.11.41) (2018-03-02)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.40"></a>
## [0.11.40](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.39...@times-components/article-image@0.11.40) (2018-03-01)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.39"></a>
## [0.11.39](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.38...@times-components/article-image@0.11.39) (2018-02-28)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.38"></a>
## [0.11.38](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.37...@times-components/article-image@0.11.38) (2018-02-28)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.37"></a>
## [0.11.37](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.36...@times-components/article-image@0.11.37) (2018-02-26)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.36"></a>
## [0.11.36](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.35...@times-components/article-image@0.11.36) (2018-02-23)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.35"></a>
## [0.11.35](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.34...@times-components/article-image@0.11.35) (2018-02-23)


### Bug Fixes

* allow storybook-native debugging by upgrading react native ([#673](https://github.com/newsuk/times-components/issues/673)) ([2228d33](https://github.com/newsuk/times-components/commit/2228d33))




<a name="0.11.34"></a>
## [0.11.34](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.33...@times-components/article-image@0.11.34) (2018-02-21)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.33"></a>
## [0.11.33](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.32...@times-components/article-image@0.11.33) (2018-02-20)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.32"></a>
## [0.11.32](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.31...@times-components/article-image@0.11.32) (2018-02-20)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.31"></a>
## [0.11.31](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.29...@times-components/article-image@0.11.31) (2018-02-16)


### Bug Fixes

* apply new dextrose ([#651](https://github.com/newsuk/times-components/issues/651)) ([ca586ee](https://github.com/newsuk/times-components/commit/ca586ee))
* typo in grouping name ([#656](https://github.com/newsuk/times-components/issues/656)) ([680296c](https://github.com/newsuk/times-components/commit/680296c))




<a name="0.11.30"></a>
## [0.11.30](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.29...@times-components/article-image@0.11.30) (2018-02-16)


### Bug Fixes

* typo in grouping name ([#656](https://github.com/newsuk/times-components/issues/656)) ([680296c](https://github.com/newsuk/times-components/commit/680296c))




<a name="0.11.29"></a>
## [0.11.29](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.28...@times-components/article-image@0.11.29) (2018-02-15)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.28"></a>
## [0.11.28](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.27...@times-components/article-image@0.11.28) (2018-02-15)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.27"></a>
## [0.11.27](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.25...@times-components/article-image@0.11.27) (2018-02-14)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.26"></a>
## [0.11.26](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.25...@times-components/article-image@0.11.26) (2018-02-14)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.25"></a>
## [0.11.25](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.24...@times-components/article-image@0.11.25) (2018-02-13)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.24"></a>
## [0.11.24](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.23...@times-components/article-image@0.11.24) (2018-02-09)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.23"></a>
## [0.11.23](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.22...@times-components/article-image@0.11.23) (2018-02-07)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.22"></a>
## [0.11.22](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.21...@times-components/article-image@0.11.22) (2018-02-06)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.21"></a>
## [0.11.21](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.20...@times-components/article-image@0.11.21) (2018-02-06)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.20"></a>
## [0.11.20](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.19...@times-components/article-image@0.11.20) (2018-02-06)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.19"></a>
## [0.11.19](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.18...@times-components/article-image@0.11.19) (2018-02-06)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.18"></a>
## [0.11.18](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.17...@times-components/article-image@0.11.18) (2018-01-31)


### Bug Fixes

* fix the broken storybook addon by updating storybook. ([#583](https://github.com/newsuk/times-components/issues/583)) ([6056e00](https://github.com/newsuk/times-components/commit/6056e00))




<a name="0.11.17"></a>
## [0.11.17](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.16...@times-components/article-image@0.11.17) (2018-01-30)


### Bug Fixes

* android dextrose ([#569](https://github.com/newsuk/times-components/issues/569)) ([b5b74fa](https://github.com/newsuk/times-components/commit/b5b74fa))




<a name="0.11.16"></a>
## [0.11.16](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.15...@times-components/article-image@0.11.16) (2018-01-30)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.15"></a>
## [0.11.15](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.14...@times-components/article-image@0.11.15) (2018-01-29)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.14"></a>
## [0.11.14](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.13...@times-components/article-image@0.11.14) (2018-01-29)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.13"></a>
## [0.11.13](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.12...@times-components/article-image@0.11.13) (2018-01-26)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.12"></a>
## [0.11.12](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.11...@times-components/article-image@0.11.12) (2018-01-26)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.11"></a>
## [0.11.11](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.10...@times-components/article-image@0.11.11) (2018-01-26)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.10"></a>
## [0.11.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.9...@times-components/article-image@0.11.10) (2018-01-19)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.9"></a>
## [0.11.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.7...@times-components/article-image@0.11.9) (2018-01-19)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.8"></a>
## [0.11.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.7...@times-components/article-image@0.11.8) (2018-01-19)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.7"></a>
## [0.11.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.6...@times-components/article-image@0.11.7) (2018-01-18)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.6"></a>
## [0.11.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.5...@times-components/article-image@0.11.6) (2018-01-17)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.5"></a>
## [0.11.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.4...@times-components/article-image@0.11.5) (2018-01-16)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.4"></a>
## [0.11.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.3...@times-components/article-image@0.11.4) (2018-01-15)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.3"></a>
## [0.11.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.2...@times-components/article-image@0.11.3) (2018-01-15)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.2"></a>
## [0.11.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.1...@times-components/article-image@0.11.2) (2018-01-15)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.1"></a>
## [0.11.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.11.0...@times-components/article-image@0.11.1) (2018-01-15)




**Note:** Version bump only for package @times-components/article-image

<a name="0.11.0"></a>
# [0.11.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.10.5...@times-components/article-image@0.11.0) (2018-01-15)


### Features

* responsive inline images ([#518](https://github.com/newsuk/times-components/issues/518)) ([ed90802](https://github.com/newsuk/times-components/commit/ed90802))




<a name="0.10.6"></a>
## [0.10.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.10.5...@times-components/article-image@0.10.6) (2018-01-10)




**Note:** Version bump only for package @times-components/article-image

<a name="0.10.5"></a>
## [0.10.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.10.3...@times-components/article-image@0.10.5) (2018-01-10)


### Bug Fixes

* REPLAT-1166 Responsive Article Patterns ([#500](https://github.com/newsuk/times-components/issues/500)) ([873a16e](https://github.com/newsuk/times-components/commit/873a16e))




<a name="0.10.4"></a>
## [0.10.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.10.3...@times-components/article-image@0.10.4) (2018-01-10)


### Bug Fixes

* REPLAT-1166 Responsive Article Patterns ([#500](https://github.com/newsuk/times-components/issues/500)) ([873a16e](https://github.com/newsuk/times-components/commit/873a16e))




<a name="0.10.3"></a>
## [0.10.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.10.2...@times-components/article-image@0.10.3) (2018-01-08)




**Note:** Version bump only for package @times-components/article-image

<a name="0.10.2"></a>
## [0.10.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.10.1...@times-components/article-image@0.10.2) (2018-01-05)




**Note:** Version bump only for package @times-components/article-image

<a name="0.10.1"></a>
## [0.10.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.10.0...@times-components/article-image@0.10.1) (2018-01-04)




**Note:** Version bump only for package @times-components/article-image

<a name="0.10.0"></a>
# [0.10.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.9.2...@times-components/article-image@0.10.0) (2018-01-03)


### Features

* REPLAT-602 Add Pull Quotes ([#469](https://github.com/newsuk/times-components/issues/469)) ([b2ac5a0](https://github.com/newsuk/times-components/commit/b2ac5a0))




<a name="0.9.2"></a>
## [0.9.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.9.1...@times-components/article-image@0.9.2) (2018-01-02)




**Note:** Version bump only for package @times-components/article-image

<a name="0.9.1"></a>
## [0.9.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.9.0...@times-components/article-image@0.9.1) (2018-01-02)




**Note:** Version bump only for package @times-components/article-image

<a name="0.9.0"></a>
# [0.9.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.7.8...@times-components/article-image@0.9.0) (2017-12-22)


### Features

* support preview images on Android ([#480](https://github.com/newsuk/times-components/issues/480)) ([0840dd8](https://github.com/newsuk/times-components/commit/0840dd8))




<a name="0.8.0"></a>
# [0.8.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.7.8...@times-components/article-image@0.8.0) (2017-12-22)


### Features

* support preview images on Android ([#480](https://github.com/newsuk/times-components/issues/480)) ([0840dd8](https://github.com/newsuk/times-components/commit/0840dd8))




<a name="0.7.8"></a>
## [0.7.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.7.7...@times-components/article-image@0.7.8) (2017-12-22)




**Note:** Version bump only for package @times-components/article-image

<a name="0.7.7"></a>
## [0.7.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.7.6...@times-components/article-image@0.7.7) (2017-12-20)




**Note:** Version bump only for package @times-components/article-image

<a name="0.7.6"></a>
## [0.7.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.7.5...@times-components/article-image@0.7.6) (2017-12-19)




**Note:** Version bump only for package @times-components/article-image

<a name="0.7.5"></a>
## [0.7.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.7.3...@times-components/article-image@0.7.5) (2017-12-16)


### Bug Fixes

* make react-native-web a peer ([#470](https://github.com/newsuk/times-components/issues/470)) ([334208c](https://github.com/newsuk/times-components/commit/334208c))




<a name="0.7.4"></a>
## [0.7.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.7.3...@times-components/article-image@0.7.4) (2017-12-16)


### Bug Fixes

* make react-native-web a peer ([#470](https://github.com/newsuk/times-components/issues/470)) ([334208c](https://github.com/newsuk/times-components/commit/334208c))




<a name="0.7.3"></a>
## [0.7.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.7.2...@times-components/article-image@0.7.3) (2017-12-15)


### Bug Fixes

* add left padding for primary inline image for mob web and native ([6487884](https://github.com/newsuk/times-components/commit/6487884))




<a name="0.7.2"></a>
## [0.7.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.7.1...@times-components/article-image@0.7.2) (2017-12-14)




**Note:** Version bump only for package @times-components/article-image

<a name="0.7.1"></a>
## [0.7.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.7.0...@times-components/article-image@0.7.1) (2017-12-13)




**Note:** Version bump only for package @times-components/article-image

<a name="0.7.0"></a>
# [0.7.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.6.2...@times-components/article-image@0.7.0) (2017-12-12)


### Bug Fixes

* resolve article tech debt ([#446](https://github.com/newsuk/times-components/issues/446)) ([4ff6a6b](https://github.com/newsuk/times-components/commit/4ff6a6b))


### Features

* refactor storybook package ([#453](https://github.com/newsuk/times-components/issues/453)) ([acadef3](https://github.com/newsuk/times-components/commit/acadef3))




<a name="0.6.2"></a>
## [0.6.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.6.1...@times-components/article-image@0.6.2) (2017-12-08)




**Note:** Version bump only for package @times-components/article-image

<a name="0.6.1"></a>
## [0.6.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.6.0...@times-components/article-image@0.6.1) (2017-12-08)




**Note:** Version bump only for package @times-components/article-image

<a name="0.6.0"></a>
# [0.6.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.5.2...@times-components/article-image@0.6.0) (2017-12-07)


### Features

* make article responsive ([#421](https://github.com/newsuk/times-components/issues/421)) ([3c2aaf7](https://github.com/newsuk/times-components/commit/3c2aaf7))




<a name="0.5.2"></a>
## [0.5.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.5.0...@times-components/article-image@0.5.2) (2017-12-04)




**Note:** Version bump only for package @times-components/article-image

<a name="0.5.1"></a>
## [0.5.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.5.0...@times-components/article-image@0.5.1) (2017-12-04)




**Note:** Version bump only for package @times-components/article-image

<a name="0.5.0"></a>
# [0.5.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.4.12...@times-components/article-image@0.5.0) (2017-12-03)


### Features

* use Yarn Workspaces ([55a7b88](https://github.com/newsuk/times-components/commit/55a7b88))




<a name="0.4.12"></a>
## [0.4.12](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.4.11...@times-components/article-image@0.4.12) (2017-11-24)




<a name="0.4.11"></a>
## [0.4.11](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.4.10...@times-components/article-image@0.4.11) (2017-11-22)




<a name="0.4.10"></a>
## [0.4.10](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.4.9...@times-components/article-image@0.4.10) (2017-11-22)




<a name="0.4.9"></a>
## [0.4.9](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.4.8...@times-components/article-image@0.4.9) (2017-11-20)




<a name="0.4.8"></a>
## [0.4.8](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.4.7...@times-components/article-image@0.4.8) (2017-11-20)




<a name="0.4.7"></a>
## [0.4.7](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.4.6...@times-components/article-image@0.4.7) (2017-11-17)


### Bug Fixes

* use ImageBackground wrapped in View ([#399](https://github.com/newsuk/times-components/issues/399)) ([e77bcde](https://github.com/newsuk/times-components/commit/e77bcde))




<a name="0.4.6"></a>
## [0.4.6](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.4.5...@times-components/article-image@0.4.6) (2017-11-16)




<a name="0.4.5"></a>
## [0.4.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.4.4...@times-components/article-image@0.4.5) (2017-11-13)




<a name="0.4.4"></a>
## [0.4.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.4.3...@times-components/article-image@0.4.4) (2017-11-09)




<a name="0.4.3"></a>
## [0.4.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.4.2...@times-components/article-image@0.4.3) (2017-11-09)




<a name="0.4.2"></a>
## [0.4.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.4.1...@times-components/article-image@0.4.2) (2017-11-09)




<a name="0.4.1"></a>
## [0.4.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.4.0...@times-components/article-image@0.4.1) (2017-11-07)




<a name="0.4.0"></a>
# [0.4.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.3.5...@times-components/article-image@0.4.0) (2017-11-07)


### Features

* add article loading state ([#324](https://github.com/newsuk/times-components/issues/324)) ([b2c07fe](https://github.com/newsuk/times-components/commit/b2c07fe))




<a name="0.3.5"></a>
## [0.3.5](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.3.3...@times-components/article-image@0.3.5) (2017-10-31)




<a name="0.3.4"></a>
## [0.3.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.3.3...@times-components/article-image@0.3.4) (2017-10-31)




<a name="0.3.3"></a>
## [0.3.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.3.2...@times-components/article-image@0.3.3) (2017-10-24)




<a name="0.3.2"></a>
## [0.3.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.3.1...@times-components/article-image@0.3.2) (2017-10-13)


### Bug Fixes

* prettier to ignore native code ([#296](https://github.com/newsuk/times-components/issues/296)) ([d6d24ed](https://github.com/newsuk/times-components/commit/d6d24ed))




<a name="0.3.1"></a>
## [0.3.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.3.0...@times-components/article-image@0.3.1) (2017-10-13)


### Bug Fixes

* ignore package.json ([#295](https://github.com/newsuk/times-components/issues/295)) ([3614c6e](https://github.com/newsuk/times-components/commit/3614c6e))




<a name="0.3.0"></a>
# [0.3.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.2.4...@times-components/article-image@0.3.0) (2017-10-13)


### Features

* add json files to lint and fmt ([#274](https://github.com/newsuk/times-components/issues/274)) ([f008b0f](https://github.com/newsuk/times-components/commit/f008b0f))




<a name="0.2.4"></a>
## [0.2.4](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.2.1...@times-components/article-image@0.2.4) (2017-10-12)




<a name="0.2.3"></a>
## [0.2.3](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.2.1...@times-components/article-image@0.2.3) (2017-10-09)




<a name="0.2.2"></a>
## [0.2.2](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.2.1...@times-components/article-image@0.2.2) (2017-10-09)




<a name="0.2.1"></a>
## [0.2.1](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.2.0...@times-components/article-image@0.2.1) (2017-10-05)




<a name="0.2.0"></a>
# [0.2.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.0.2...@times-components/article-image@0.2.0) (2017-09-28)


### Features

* add images to article ([#249](https://github.com/newsuk/times-components/issues/249)) ([0387409](https://github.com/newsuk/times-components/commit/0387409))




<a name="0.1.0"></a>
# [0.1.0](https://github.com/newsuk/times-components/compare/@times-components/article-image@0.0.2...@times-components/article-image@0.1.0) (2017-09-28)


### Features

* add images to article ([#249](https://github.com/newsuk/times-components/issues/249)) ([0387409](https://github.com/newsuk/times-components/commit/0387409))




<a name="0.0.2"></a>
## 0.0.2 (2017-09-27)
