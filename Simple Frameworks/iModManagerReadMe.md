# iModManager 概览与说明文档

## 概述

`iModManager` 是一个集成管理系统，专门用于管理游戏中的 Mod 添加的变量和配置，以及处理 Mod 相关的小组件。它为 Mod 制作者提供了简便的 API 来操控各种 Mod 变量，包括设置和获取配置值、游戏变量、NPC 属性等。通过使用 `iModManager`，Mod 制作者可以轻松地管理和集成自己的 Mod，提升开发效率，避免重复编写相似的代码。

### 主要特点：

- **集中管理 Mod 变量与配置**：可以通过 `iModManager` 轻松设置、获取、修改游戏中的 Mod 配置和变量。
- **增强的灵活性**：提供了设置 NPC 属性、修改游戏变量、处理小组件等功能。
- **避免代码重复**：减少不同 Mod 之间对公共逻辑的重复实现，便于维护。

## 主要功能说明

以下是 `iModManager` 提供的主要 API 函数，以及每个函数的详细说明和使用示例。

### 1. 设置与获取配置属性

#### `setCf(prop, value)`

**说明**：设置配置属性的值。

- **参数**：
  - `prop` (string)：要设置的配置属性名。
  - `value` (\*)：要为配置属性设置的值。
- **示例**：

```javascript
iMod.setCf('difficulty', 'hard'); // 设置游戏难度为“hard”
iMod.setCf('soundVolume', 80); // 设置音量为 80%
iMod.setCf('language', 'en'); // 设置语言为英文
```

#### `getCf(prop)`

**说明**：获取配置属性的值。

- **参数**：
  - `prop` (string)：要获取的配置属性名。
- **返回值**：返回属性的值。
- **示例**：

```javascript
const difficulty = iMod.getCf('difficulty'); // 获取游戏难度
const volume = iMod.getCf('soundVolume'); // 获取音量设置
const language = iMod.getCf('language'); // 获取当前语言
```

### 2. 设置与获取游戏变量

#### `setV(prop, value)`

**说明**：设置游戏变量的值。

- **参数**：
  - `prop` (string)：要设置的变量名。
  - `value` (\*)：要为游戏变量设置的值。
- **示例**：

```javascript
iMod.setV('playerHealth', 100); // 设置玩家生命值为 100
iMod.setV('playerMana', 50); // 设置玩家魔法值为 50
iMod.setV('questProgress', 'started'); // 设置任务进度为“开始”
```

#### `addV(prop, value)`

**说明**：为已有的游戏变量增加一个值，如果变量不存在，则创建并设置为给定值。

- **参数**：
  - `prop` (string)：要增加值的变量名。
  - `value` (\*)：要增加的值。
- **返回值**：返回修改后的变量值。
- **示例**：

```javascript
iMod.addV('coins', 10); // 增加 10 个金币
iMod.addV('experience', 100); // 增加 100 点经验值
```

#### `getV(prop)`

**说明**：获取游戏变量的值。

- **参数**：
  - `prop` (string)：要获取的变量名。
- **返回值**：返回变量的值。
- **示例**：

```javascript
const coins = iMod.getV('coins'); // 获取玩家拥有的金币数量
const playerHealth = iMod.getV('playerHealth'); // 获取玩家的生命值
```

### 3. 管理 NPC 属性

#### `setNpc(chara, prop, value)`

**说明**：设置 NPC 的特定属性值。如果属性不存在，则创建该属性。

- **参数**：
  - `chara` (string)：NPC 标识符。
  - `prop` (string)：要设置的属性名。
  - `value` (\*)：要为属性设置的值。
- **返回值**：返回 NPC 的完整属性对象。
- **示例**：

```javascript
iMod.setNpc('npc1', 'friendliness', 80); // 设置 NPC1 的友好度为 80
iMod.setNpc('npc1', 'strength', 50); // 设置 NPC1 的力量值为 50
iMod.setNpc('npc2', 'health', 100); // 设置 NPC2 的生命值为 100
```

#### `getNpc(chara, prop)`

**说明**：获取 NPC 的特定属性值。如果属性不存在，则返回默认值。

- **参数**：
  - `chara` (string)：NPC 标识符。
  - `prop` (string)：要获取的属性名。
- **返回值**：返回属性的值。
- **示例**：

```javascript
const friendliness = iMod.getNpc('npc1', 'friendliness'); // 获取 NPC1 的友好度
const health = iMod.getNpc('npc2', 'health'); // 获取 NPC2 的生命值
```


#### `has(type, prop)`

**说明**：检查某种类型的配置或变量中是否存在特定属性。

- **参数**：
  - `type` (string)：要检查的类型。
  - `prop` (string)：要检查的属性。
- **返回值**：返回布尔值，指示属性是否存在。
- **示例**：

```javascript
const hasDifficulty = iMod.has('Configs', 'difficulty'); // 检查是否设置了游戏难度
const hasMana = iMod.has('Vars', 'playerMana'); // 检查是否存在玩家魔法值变量
```

## 使用 iModManager 的好处

1. **集中管理**：通过 `iModManager`，Mod 制作者可以将所有与 Mod 相关的配置和变量集中在一个地方进行管理，降低管理复杂度。
2. **增强代码复用性**：利用统一的 API，可以简化不同 Mod 之间的代码实现，减少重复代码，提高代码复用性。
3. **简化开发过程**：`iModManager` 提供了简单而实用的函数来设置、获取和修改变量和配置，使 Mod 制作者可以专注于开发核心功能而非管理琐碎的细节。
4. **减少更新冲突**：通过使用 `iModManager` 来集中管理变量和配置，可以在游戏本体更新时，防止由于变量路径变化而导致的冲突和失效，提高 Mod 的兼容性。

## 总结

`iModManager` 是一个强大的工具，帮助 Mod 制作者轻松管理游戏中的 Mod 变量和配置。它提供了一系列易用的 API 来简化开发过程，提升代码的复用性和可维护性。通过集中化的管理和集成，Mod 制作者可以更快速地开发高质量的游戏 Mod，提供更丰富的游戏体验。
