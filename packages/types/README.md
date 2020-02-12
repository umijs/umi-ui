# umi ui types

Type definitions for umi ui.

[![NPM version](https://img.shields.io/npm/v/@umijs/types.svg?style=flat)](https://npmjs.org/package/@umijs/types) [![Build Status](https://img.shields.io/travis/umijs/@umijs/types.svg?style=flat)](https://travis-ci.org/umijs/@umijs/types) [![NPM downloads](http://img.shields.io/npm/dm/@umijs/types.svg?style=flat)](https://npmjs.org/package/@umijs/types)

## Why

## Installation

```bash
$ yarn add @umijs/types
```

## Usage

```tsx
import { IApi } from 'umi';

export default function(api: IApi) {
  api.addPanel({
    title: "org.umi.ui.blocks.content.title",
    path: "/blocks",
    icon: <Icon />,
    component: () => (
      <div>Hello</div>
    )
  });
}
```

![](https://raw.githubusercontent.com/ycjcl868/cdn/master/20200202085639.png?token=ADHXG5MPXFUXADBIJWVITE26GYPIO)

## LICENSE

MIT
