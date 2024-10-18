# SelectCase 类文档

## 概述
`SelectCase` 类提供了一种简单的方法来处理条件逻辑，类似于 `switch` 语句，但具有更大的灵活性。它允许您为不同的条件创建不同的情况，指定未匹配条件的默认结果，并使用方法来评估条件与输入值的匹配情况。

该类在管理多种不同结果的场景中非常有用，具体取决于输入。

## 如何使用 SelectCase

在这里，我们将逐步解释如何使用 `SelectCase` 类，并提供示例代码。

### 1. 创建 SelectCase 的实例
要开始使用 `SelectCase` 类，首先需要使用 `new` 关键字创建一个实例：

```javascript
const select = new SelectCase();
```

### 2. 使用 `case()` 添加条件
可以使用 `.case()` 方法向选择语句添加条件。`.case()` 方法接受两个参数：
- `cond`：可以是数字、字符串或由数字/字符串组成的数组。
- `result`：与此条件相关联的结果。

例如：

```javascript
select.case(1, "one").case(2, "two").case(3, "three");
```
此示例为值 1、2 和 3 创建了不同的情况，每个值关联一个字符串。

### 3. 使用 `else()` 设置默认值
如果没有匹配的情况，可以使用 `.else()` 方法指定默认值。当没有其他匹配条件时，将返回此值。

```javascript
select.else("unknown");
```

### 4. 使用 `has()` 检查值
要检查一个值并获得相应的结果，可以使用 `.has()` 方法。此方法返回匹配的结果或未找到匹配时的默认值。

示例：

```javascript
console.log(select.has(2)); // 输出: "two"
console.log(select.has(4)); // 输出: "unknown"
```

### 5. 使用区间和匹配
`SelectCase` 类还有一些方法可以用于与条件进行比较：

- **使用数组**：可以通过传递一个由两个数字组成的数组来创建值的区间。例如，`[1, 3]` 表示从 1 到 3 的所有数字。

```javascript
select.case([1, 3], "small").case([4, 6], "medium").else("large");
console.log(select.has(2)); // 输出: "small"
console.log(select.has(5)); // 输出: "medium"
```

- **小于和大于**：可以使用 `isLT()`、`isGT()`、`isLTE()` 和 `isGTE()` 来比较值：

```javascript
select.case(10, "ten").case(20, "twenty").else("unknown");
console.log(select.isLT(15)); // 输出: "ten"
console.log(select.isGT(15)); // 输出: "twenty"
```

这些方法在需要与预定义的阈值进行比较时非常有用。

### 6. 字符串匹配
要处理字符串匹配，可以使用 `.caseMatchS()` 方法匹配特定的字符串模式。

```javascript
select.caseMatchS("abcd", "match").else("unknown");
console.log(select.has("a")); // 输出: "match"
console.log(select.has("f")); // 输出: "unknown"
```

## 总结
`SelectCase` 类是一种管理复杂条件的强大工具，易于阅读和使用：
1. **创建实例**：`const select = new SelectCase();`
2. **添加条件**：使用 `.case()` 或 `.caseMatch()` 来处理数字或字符串值。
3. **设置默认值**：使用 `.else()` 定义一个备用结果。
4. **检查值**：使用 `.has()`、`.isLT()`、`.isGT()` 等方法来评估值。

### 示例代码
这是一个完整的示例，说明如何使用 `SelectCase` 类：

```javascript
const select = new SelectCase();
select.case(1, "one")
      .case([2, 3], "small")
      .caseMatchS("abc", "matched string")
      .else("unknown");

console.log(select.has(1)); // 输出: "one"
console.log(select.has(3)); // 输出: "small"
console.log(select.has("a")); // 输出: "matched string"
console.log(select.has(10)); // 输出: "unknown"
```

### 其他示例代码

#### 示例：年龄组分类
```javascript
const ageSelect = new SelectCase();
ageSelect.case([0, 12], "Child")
          .case([13, 19], "Teenager")
          .case([20, 64], "Adult")
          .else("Senior");

console.log(ageSelect.has(8)); // 输出: "Child"
console.log(ageSelect.has(15)); // 输出: "Teenager"
console.log(ageSelect.has(70)); // 输出: "Senior"
```

#### 示例：成绩分类
```javascript
const gradeSelect = new SelectCase();
gradeSelect.case("A", "Excellent")
           .case("B", "Good")
           .case("C", "Average")
           .case("D", "Below Average")
           .else("Fail");

console.log(gradeSelect.has("A")); // 输出: "Excellent"
console.log(gradeSelect.has("C")); // 输出: "Average"
console.log(gradeSelect.has("F")); // 输出: "Fail"
```

#### 示例：温度范围
```javascript
const tempSelect = new SelectCase();
tempSelect.case([-50, 0], "Freezing")
          .case([1, 15], "Cold")
          .case([16, 25], "Mild")
          .case([26, 35], "Warm")
          .else("Hot");

console.log(tempSelect.has(10)); // 输出: "Cold"
console.log(tempSelect.has(30)); // 输出: "Warm"
console.log(tempSelect.has(40)); // 输出: "Hot"
```

## 方法列表

### `SelectCase` 类包含的方法
1. **`case(cond, result)`**：添加给定条件和结果的情况。
2. **`else(result)`**：设置在没有匹配情况时的默认结果。
3. **`has(pick)`**：检查给定值是否匹配任何情况。
4. **`isLT(pick)`**：检查值是否小于指定的情况。
5. **`isGT(pick)`**：检查值是否大于指定的情况。
6. **`isLTE(pick)`**：检查值是否小于或等于指定的情况。
7. **`isGTE(pick)`**：检查值是否大于或等于指定的情况。
8. **`caseMatch(cond, result)`**：添加具有数字匹配条件的情况。
9. **`caseMatchS(cond, result)`**：添加具有字符串匹配条件的情况。

请随意实验并根据您的需求调整 `SelectCase` 类！