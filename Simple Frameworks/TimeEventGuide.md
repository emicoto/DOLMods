
**标题：基于 Sugarcube2 的游戏时间事件管理系统指南（面向 Mod 作者）**

## 概述
时间事件管理系统是一个基于 JavaScript 的时间处理器，专为使用 Sugarcube2 框架构建的游戏而设计。它旨在高效管理和操控依赖时间进程的游戏内事件。该系统能够处理各种基于时间的操作，包括按秒、按分钟、按小时、按天甚至按月触发事件，同时还支持时间的前进和倒退。通过使用这个系统，Mod 作者可以轻松地添加和管理游戏内的时间事件，使得游戏更加动态和充满变化。本指南旨在为没有编程基础的 Mod 爱好者提供详细的操作步骤和示例，让他们能够轻松上手。

## 系统机制与实现逻辑
**TimeHandle** 对象是时间事件管理系统的核心组件。它提供了跟踪时间、计算时间差异和管理基于时间的事件的方法。系统分为以下几个关键部分：

1. **TimeHandle 对象**：主要对象，处理所有与时间相关的功能，包括计算时间差异、管理事件列表以及根据时间进展触发事件。

2. **与时间相关的事件**：基于发生频率对时间事件进行分类：
   - **onSec、onMin、onHour、onDay、onWeek、onMonth**：基于特定时间单位触发。
   - **onBefore、onThread、onAfter**：这些事件用于特殊功能，如为即将到来的事件做准备、处理并发线程或运行后处理任务。

3. **时间计算函数**：
   - **monthDays()**：计算一个月内经过的总天数，考虑不同月份的天数。
   - **passTime()**：计算两个时间点之间经过的时间，表示为前一个和当前日期。它提供详细的输出，包括秒、分钟、小时、天、周、月和年。

4. **事件注册与执行**：
   - **set(type, eventData)**：将新事件添加到系统的事件列表中，根据事件类型分类。
   - **get(type)**：获取与特定类型相关的事件列表。
   - **run(type, timeData)**：执行某一类型的所有事件，检查条件以确定是否应执行事件。

5. **时间旅行功能**：
   - **timeTravel(option, backward = false)**：允许游戏操控游戏内时间，可以前进或倒退。它相应地更新时间戳，使得可以创建涉及改变过去或跳跃到未来的游戏机制。

6. **时间流逝机制**：
   - `Time.pass()` 函数覆盖了默认的时间进展，以启用自定义的时间事件处理。它初始化时间数据，计算流逝的时间，并触发相应的事件（例如按秒、分钟、小时等）。

7. **TimeEvent 类**：该类允许用户创建自定义时间事件。每个事件都有一个类型和一个 ID，以及可选的条件（`Cond()`）和动作（`Action()`）。条件是一个决定是否应触发事件的函数，动作是在满足条件时执行的函数。

## 实现示例
以下示例演示了如何创建一个每天触发的时间事件，用于更新游戏内角色状态：

```javascript
new TimeEvent('onDay', 'dailyCharacterUpdate')
  .Cond((timeData) => timeData.day > 0)  // 确保是新的一天的条件
  .Action((timeData) => {
    // 执行的动作：更新角色的健康或能量
    console.log('每日更新触发：', timeData);
    V.character.energy = Math.min(V.character.energy + 10, 100);  // 恢复能量
  });
```

在这个示例中，`TimeEvent` 类用于定义一个新的 `'onDay'` 事件，如果满足条件，它将在每天触发指定的动作。条件检查是否已经过去至少一天，而动作则增加角色的能量 10 点。

## 如何新建时间事件
要创建新的时间事件，请按照以下步骤操作：

1. **定义事件类型**：确定事件的触发时间。可用的类型有：`'onSec'`（每秒）、`'onMin'`（每分钟）、`'onHour'`（每小时）、`'onDay'`（每天）、`'onWeek'`（每周）、`'onMonth'`（每月）、`'onBefore'`（事件前）、`'onThread'`（事件进行中） 和 `'onAfter'`（事件后）。

2. **创建新的 TimeEvent 对象**：通过指定事件类型和唯一的 ID 实例化一个新的 `TimeEvent` 对象。例如：
   ```javascript
   const myEvent = new TimeEvent('onHour', 'hourlyUpdate');
   ```
   `onHour` 表示该事件每小时触发一次，`'hourlyUpdate'` 是事件的唯一标识符。

3. **定义条件（可选）**：条件决定了事件是否应该执行。如果没有条件，事件会每次都触发。
   ```javascript
   myEvent.Cond((timeData) => timeData.hour > 0);  // 只有在时间到达一个小时时才触发
   ```

4. **定义动作**：动作是事件触发时执行的操作，可以是更新游戏变量、生成游戏内对话等：
   ```javascript
   myEvent.Action((timeData) => {
     console.log('每小时更新执行。');
     V.character.health -= 5;  // 每小时角色健康下降 5 点
   });
   ```

5. **注册事件**：事件在创建时自动注册到 `TimeHandle` 中，无需额外步骤。

## 实际应用案例
以下是一些实际应用的时间事件示例，帮助 Mod 作者理解如何将时间事件融入游戏中：

- **每日资源生产**：每天为村庄生产一定的食物资源：
  ```javascript
  new TimeEvent('onDay', 'dailyFoodProduction')
    .Action(() => {
      V.village.food += 20;
      console.log('生产食物。总食物量：', V.village.food);
    });
  ```
  在这个例子中，每天都会为村庄增加 20 个单位的食物。这样可以模拟村民的日常劳动成果。

- **夜间强盗袭击**：每晚强盗会袭击村庄，玩家需要防御：
  ```javascript
  new TimeEvent('onHour', 'nightBanditAttack')
    .Cond((timeData) => timeData.hour >= 18 || timeData.hour <= 6)  // 晚上 6 点到早上 6 点之间
    .Action(() => {
      if (V.village.defense > Math.random() * 100) {
        console.log('成功击退强盗。');
      } else {
        V.village.food -= 10;
        console.log('强盗偷走了食物。剩余食物：', V.village.food);
      }
    });
  ```
  这个例子中，强盗会在晚上随机袭击村庄，如果村庄的防御力不足，食物会被偷走。

- **角色睡眠与精力恢复**：每天晚上 10 点角色会进入睡眠状态，精力恢复：
  ```javascript
  new TimeEvent('onHour', 'characterSleep')
    .Cond((timeData) => timeData.hour === 22)  // 晚上 10 点触发
    .Action(() => {
      V.character.energy = Math.min(V.character.energy + 30, 100);  // 恢复 30 点能量
      console.log('角色入睡，精力恢复。当前精力：', V.character.energy);
    });
  ```
  在这个例子中，每天晚上 10 点角色会自动恢复精力，这有助于模拟角色的日常作息。

- **月度村庄集市**：每月的第一天会有一个集市，玩家可以在集市上进行交易：
  ```javascript
  new TimeEvent('onMonth', 'villageMarket')
    .Cond((timeData) => timeData.day === 1)  // 每月的第一天
    .Action(() => {
      console.log('村庄集市开始，玩家可以交易。');
      V.market.open = true;  // 开放集市
    });
  ```
  这个例子展示了如何实现每月定期的事件，例如村庄集市，这样可以为玩家提供更多的互动内容。

这些示例展示了如何通过时间事件系统丰富游戏机制，使游戏世界更加动态，并为玩家提供更具沉浸感的体验。通过这些事件，玩家可以看到他们的行动如何随着时间的推移而对游戏世界产生影响。

## 总结
时间事件管理系统是 Sugarcube2 游戏的强大工具，能够无缝管理时间依赖的事件。通过利用 **TimeHandle** 和 **TimeEvent**，Mod 作者可以创建复杂且响应迅速的游戏环境，使事件随着游戏内时间的进展自然演变。该系统支持多种自定义选项，适用于多种游戏场景，如日常任务、事件驱动的世界变化和时间旅行机制。

要创建新事件，只需实例化一个 **TimeEvent** 对象，定义其条件并指定动作。通过这种方法，Mod 作者可以为游戏世界带来动态和不断发展的叙事，从而提升游戏的趣味性和深度。如果您是没有编程经验的爱好者，可以从简单的事件开始，逐步掌握如何让您的游戏世界变得更加生动。
