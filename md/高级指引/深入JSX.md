# 深入 JSX

本质上来讲，JSX 只是为 React.createElement(component, props, ...children) 方法提供的语法糖。比如下面的代码：

```
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

编译为：

```
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

如果没有子代，你还可以使用自闭合标签，比如：

```
<div className="sidebar" />
```

编译为：

```
React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
```

如果你想彻底验证 JSX 是如何转换为 JavaScript 的，你可以尝试 在线 Babel 编译器.


# 指定 React 元素类型

JSX 的标签名决定了 React 元素的类型。

大写开头的 JSX 标签表示一个 React 组件。这些标签将会被编译为同名变量并被引用，所以如果你使用了 <Foo /> 表达式，则必须在作用域中先声明 Foo 变量。

## React 必须声明

由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先声明 React 变量。

比如，下面两个导入都是必须的，尽管 React 和 CustomButton 都没有在代码中被直接调用。

```
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // 返回 React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```

如果你使用 ```<script>``` 加载 React，它将作用于全局。

## 点表示法

你还可以使用 JSX 中的点表示法来引用 React 组件。你可以方便地从一个模块中导出许多 React 组件。例如，有一个名为 MyComponents.DatePicker 的组件，你可以直接在 JSX 中使用它：

```
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

## 首字母大写

当元素类型以小写字母开头时，它表示一个内置的组件，如 <div> 或 <span>，并将字符串 ‘div’ 或 ‘span’ 传 递给 React.createElement。 以大写字母开头的类型，如 <Foo /> 编译为 React.createElement(Foo)，并它正对应于你在 JavaScript 文件中定义或导入的组件。

我们建议用大写开头命名组件。如果你的组件以小写字母开头，请在 JSX 中使用之前其赋值给大写开头的变量。

例如，下面的代码将无法按预期运行：

```
import React from 'react';

// 错误！组件名应该首字母大写:
function hello(props) {
  // 正确！div 是有效的 HTML 标签:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // 错误！React 会将小写开头的标签名认为是 HTML 原生标签:
  return <hello toWhat="World" />;
}
```

为了解决这个问题，我们将 hello 重命名为 Hello，然后使用 <Hello /> 引用：

```
import React from 'react';

// 正确！组件名应该首字母大写:
function Hello(props) {
  // 正确！div 是有效的 HTML 标签:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // 正确！React 能够将大写开头的标签名认为是 React 组件。
  return <Hello toWhat="World" />;
}
```

## 在运行时选择类型

你不能使用表达式来作为 React 元素的标签。如果你的确想通过表达式来确定 React 元素的类型，请先将其赋值给大写开头的变量。这种情况一般会在你想通过属性值条件渲染组件时出现：

```
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 错误！JSX 标签名不能为一个表达式。
  return <components[props.storyType] story={props.story} />;
}
```

要解决这个问题，我们需要先将类型赋值给大写开头的变量。

```
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 正确！JSX 标签名可以为大写开头的变量。
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```