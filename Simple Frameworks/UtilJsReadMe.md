# util.js 文件中的函数说明与示例

## 简介
`util.js` 文件包含多个用于各种常见任务的实用工具函数。以下为每个函数的简单说明以及代码初学者也能理解的使用示例。

### 1. `isValid(props)`
**说明**：检查给定的变量是否有效，即非 `null`、`undefined`、非空数组或非空对象。

**示例**：
```javascript
console.log(isValid("hello")); // 输出: true
console.log(isValid([])); // 输出: false
console.log(isValid({})); // 输出: false
console.log(isValid([1, 2, 3])); // 输出: true
```
**具体运用**：可以用来验证表单输入是否有效，比如在提交表单之前，检查用户是否填写了所有必填字段。

### 2. `inrange(x, min, max)`
**说明**：检查 `x` 是否在 `min` 和 `max` 之间。

**示例**：
```javascript
console.log(inrange(5, 1, 10)); // 输出: true
console.log(inrange(15, 1, 10)); // 输出: false
```
**具体运用**：可以用来验证用户输入的年龄是否在合法范围内，例如：
```javascript
const age = 25;
if (inrange(age, 18, 60)) {
    console.log("年龄符合要求");
} else {
    console.log("年龄不符合要求");
}
```

### 3. `random(min, max)`
**说明**：生成一个在 `min` 和 `max` 范围之间的随机整数。

**示例**：
```javascript
console.log(random(1, 10)); // 输出: 1 到 10 之间的随机数
console.log(random(5)); // 输出: 0 到 5 之间的随机数
```
**具体运用**：可以用来生成随机验证码，例如：
```javascript
const verificationCode = random(1000, 9999);
console.log("您的验证码是: " + verificationCode);
```

### 4. `maybe(arr)`
**说明**：根据概率从数组中选择一个元素。每个元素是一个数组，包含值和概率。

**示例**：
```javascript
const options = [["Option A", 50], ["Option B", 30], ["Option C", 20]];
console.log(maybe(options)); // 可能输出: "Option A", "Option B" 或 "Option C"
```
**具体运用**：可以用在游戏中随机事件触发，例如：
```javascript
const rewards = [["金币", 60], ["宝石", 30], ["稀有道具", 10]];
console.log("您获得了: " + maybe(rewards));
```

### 5. `compares(key)`
**说明**：返回一个用于比较两个对象的函数，按指定的 `key` 进行比较。

**示例**：
```javascript
const arr = [{value: 5}, {value: 10}, {value: 1}];
arr.sort(compares('value'));
console.log(arr); // 输出: [{value: 10}, {value: 5}, {value: 1}]
```
**具体运用**：可以用来对商品按价格进行排序，例如：
```javascript
const products = [
    {name: "商品A", price: 200},
    {name: "商品B", price: 100},
    {name: "商品C", price: 150}
];
products.sort(compares('price'));
console.log(products); // 输出按价格从高到低排序的商品列表
```

### 6. `roll(times, max)`
**说明**：模拟掷骰子操作，返回掷骰子的结果及相关信息。

**示例**：
```javascript
console.log(roll(2, 6)); // 输出: { roll: '4,3', result: 7, bonus: 0 }（示例结果）
```
**具体运用**：可以用来在桌游中模拟投掷多次骰子的过程，例如：
```javascript
const result = roll(3, 6);
console.log("掷骰子结果: ", result);
```

### 7. `groupmatch(value, ...table)`
**说明**：检查给定的值是否存在于指定的数组中。

**示例**：
```javascript
console.log(groupmatch(5, 1, 2, 3, 4, 5)); // 输出: true
console.log(groupmatch("hello", "world", "foo", "bar")); // 输出: false
```
**具体运用**：可以用来验证用户输入的选项是否在允许范围内，例如：
```javascript
const allowedColors = ["red", "green", "blue"];
const userColor = "yellow";
if (groupmatch(userColor, ...allowedColors)) {
    console.log("颜色有效");
} else {
    console.log("颜色无效");
}
```

### 8. `sumObj(obj)`
**说明**：求简单对象中所有值的和。

**示例**：
```javascript
const obj = {a: 1, b: 2, c: 3};
console.log(sumObj(obj)); // 输出: 6
```
**具体运用**：可以用来计算购物车中所有商品的总价格，例如：
```javascript
const cart = {apple: 3, banana: 2, orange: 5};
console.log("购物车总价: " + sumObj(cart));
```

### 9. `sumObjProp(obj, prop)`
**说明**：求对象中指定属性的值的和。

**示例**：
```javascript
const objArr = [{value: 10}, {value: 20}, {value: 30}];
console.log(sumObjProp(objArr, 'value')); // 输出: 60
```
**具体运用**：可以用来计算公司员工的总薪水，例如：
```javascript
const employees = [
    {name: "Alice", salary: 5000},
    {name: "Bob", salary: 6000},
    {name: "Charlie", salary: 5500}
];
console.log("员工总薪水: " + sumObjProp(employees, 'salary'));
```

### 10. `swap(arr, a, b)`
**说明**：交换数组中两个元素的位置。

**示例**：
```javascript
const arr = [1, 2, 3, 4];
swap(arr, 1, 3);
console.log(arr); // 输出: [1, 4, 3, 2]
```
**具体运用**：可以用来在游戏中交换玩家的顺序，例如：
```javascript
const players = ["Alice", "Bob", "Charlie", "Dave"];
swap(players, 0, 2);
console.log(players); // 输出: ["Charlie", "Bob", "Alice", "Dave"]
```

### 11. `clone(orig)`
**说明**：深拷贝一个对象。

**示例**：
```javascript
const obj = {a: 1, b: {c: 2}};
const newObj = clone(obj);
console.log(newObj); // 输出: {a: 1, b: {c: 2}}
```
**具体运用**：可以用来复制配置对象，以便在不同环境中使用，例如：
```javascript
const config = {apiUrl: "http://example.com", retry: {count: 3}};
const newConfig = clone(config);
newConfig.retry.count = 5;
console.log(config.retry.count); // 输出: 3（原对象未被修改）
```

### 12. `countArray(arr, element)`
**说明**：统计二维数组中包含特定元素的次数。

**示例**：
```javascript
const arr = [[1, 2], [3, 4], [1, 5]];
console.log(countArray(arr, 1)); // 输出: 2
```
**具体运用**：可以用来统计班级中某个分数出现的次数，例如：
```javascript
const scores = [[90, 80], [85, 90], [75, 90]];
console.log("90分的次数: " + countArray(scores, 90));
```

### 13. `setPath(obj, path, value)`
**说明**：根据路径设置对象的值。

**示例**：
```javascript
const obj = {};
setPath(obj, 'a.b.c', 42);
console.log(obj); // 输出: {a: {b: {c: 42}}}
```
**具体运用**：可以用来动态设置配置对象的值，例如：
```javascript
const settings = {};
setPath(settings, 'user.preferences.theme', 'dark');
console.log(settings); // 输出: {user: {preferences: {theme: 'dark'}}}
```

### 14. `getPath(obj, path)`
**说明**：根据路径获取对象的值。

**示例**：
```javascript
const obj = {a: {b: {c: 42}}};
console.log(getPath(obj, 'a.b.c')); // 输出: 42
```
**具体运用**：可以用来获取用户设置中的某个特定配置值，例如：
```javascript
const userSettings = {user: {preferences: {theme: 'dark'}}};
console.log("用户主题: " + getPath(userSettings, 'user.preferences.theme'));
```

### 15. `getKeyByValue(object, value)`
**说明**：根据值查找对象中对应的键。

**示例**：
```javascript
const obj = {a: 1, b: 2, c: 3};
console.log(getKeyByValue(obj, 2)); // 输出: 'b'
```
**具体运用**：可以用来查找特定分数对应的学生，例如：
```javascript
const studentScores = {Alice: 85, Bob: 90, Charlie: 78};
console.log("分数为 90 的学生: " + getKeyByValue(studentScores, 90));
```

## 总结
`util.js` 文件中包含了多个有用的工具函数，帮助处理常见的编程任务。这些函数可以用来验证数据、生成随机数、处理对象和数组等。通过这些函数，您可以更加轻松地编写代码来解决日常问题。希望这些说明和示例能帮助您更好地理解如何使用这些工具函数。
