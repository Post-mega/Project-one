# 列表 & Keys

首先，让我们看下在Javascript中如何转化列表

如下代码，我们使用map()函数让数组中的每一项翻倍,我们得到了一个新的数列doubled

```
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

代码打印出[2, 4, 6, 8, 10]

在React中，把数组转化为数列元素的过程是相似的

## 渲染多个组件

你可以通过使用{}在JSX内构建一个元素集合

下面，我们使用Javascript中的map()方法遍历numbers数组。对数组中的每个元素返回<li>标签，最后我们得到一个数组listItems

```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

我们把整个listItems插入到ul元素中，然后渲染进DOM:

```
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

在 CodePen 上试试。

这段代码生成了一个1到5的数字列表

## 基础列表组件

通常你需要渲染一个列表到组件中

我们可以把前面的例子重构成一个组件。这个组件接收numbers数组作为参数，输出一个无序列表。

```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

当我们运行这段代码，将会看到一个警告 a key should be provided for list items ，意思是当你创建一个元素时，必须包括一个特殊的 key 属性。我们将在下一节讨论这是为什么。

让我们来给每个列表元素分配一个 key 来解决上面的那个警告：

```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

在 CodePen 上试试。

