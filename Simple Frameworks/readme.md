# 简易框架说明书

* [基础用法](#基础用法)
	* [新建内容文件](#新建内容文件)
	* [以 widget 形式在内容文件中写内容](#以-widget-形式在内容文件中写内容)
	* [使用简易框架添加内容](#使用简易框架添加内容)
		* [全部模块](#全部模块)
		* [部分模块代表的位置](#部分模块代表的位置)
	* [打包 MOD](#打包-MOD)
* [简化内容编写](#简化内容编写)
	* [多语言支持](#多语言支持)
		* [常用文本的多语言](#常用文本的多语言)
		* [编写多语言内容](#编写多语言内容)
	* [根据性别输出不同内容](#根据性别输出不同内容)
	* [根据NPC性别输出“男孩”或“女孩”](#根据NPC性别输出男孩或女孩)
	* [根据态度输出不同内容](#根据态度输出不同内容)
* [添加 NPC](#添加-npc)
* [添加物品](#添加物品)
* [添加以 JavaScript 编写的宏](#添加以-javascript-编写的宏)
* [简易框架能做什么和不能做什么](#简易框架能做什么和不能做什么)

## 基础用法
### 新建内容文件
新建一个 twee 文件，文件名随意，我们将这个 twee 文件称为“`内容文件`”。将下面这行代码复制到内容文件第一行：

```HTML
:: ASimpleContentTest [widget]
```

其中 `ASimpleContentTest` 可以替换为你喜欢的随便一个名字，但最好只使用英文字母和数字。

### 以 widget 形式在内容文件中写内容
制作 MOD 时，可以将内容分为两种：与原游戏连接的入口或内容，以及独立的新内容。对于前者，可以以 widget 形式在内容文件中添加，以利用简易框架便捷地插入原游戏。在 `内容文件` 中，以下面的形式加入一个这种内容：

```HTML
<<widget "aSimpleTest">>
我是 aSimpleTest 的具体内容
<</widget>>
```

其中 `aSimpleTest` 是这个内容的名字，可以随便替换，但最好只使用英文字母和数字。如需再加入一个内容，则如法炮制，只需修改内容名字。

因此，如果你想加入两个内容，一个名字叫 aSimpleTest，一个名字叫 aSimpleTest2，你的 `内容文件` 会是这样的：

```HTML
:: ASimpleContentTest [widget]

<<widget "aSimpleTest">>
我是 aSimpleTest 的具体内容
<</widget>>

<<widget "aSimpleTest2">>
我是 aSimpleTest2 的具体内容
<</widget>>
```

### 使用简易框架添加内容
现在，你已经有了内容文件，接下来要使用简易框架，把内容文件里的内容逐个加入游戏中。

新建一个 js 文件，文件名随意，我们将这个 js 文件称为“`载入文件`”。在载入文件里以如下形式加入一个内容：

```js
simpleFrameworks.addto('iModHeader', {
    passage: ['Start', 'Home'],
    widget: 'aSimpleTest',
})
```
其中 `aSimpleTest` 你想加入的内容的名字，`iModHeader` 是你想添加到的位置类型（在简易框架中，我们称之为“**模块**”），`Start` 和 `Home` 是你想添加到的 passage 的名字。

因此，在这个例子中，我们将 `aSimpleTest` 里面的内容添加到了名字叫 `Start` 和 `Home` 的两个 passage 中，具体是加入到了这两个 passage 的 `iModHeader` 位置（即 passage 的开头处）。

如需再加入一个内容，只需如法炮制。因此，如果你想在上面的基础上，把 `aSimpleTest2` 里面的内容加入到名字叫 `Start` 的 passage 的 `iModFooter` 位置（即 passage 的结尾处），你的 `载入文件` 会是这样的：

```js
simpleFrameworks.addto('iModHeader', {
    passage: ['Start', 'Home'],
    widget: 'aSimpleTest',
});
simpleFrameworks.addto('iModFooter', {
    passage: ['Start'],
    widget: 'aSimpleTest2',
});
```

如果你想把 `aSimpleTest2` 加入到和 `aSimpleTest` 一样的位置，可以用一种更简单的写法。例如，如果你想把 `aSimpleTest2` 加入到名字叫 `Start` 的 passage 的 `iModHeader` 位置，你的 `载入文件` 会变成这样：

```js
simpleFrameworks.addto('iModHeader', {
    passage: ['Start', 'Home'],
    widget: 'aSimpleTest',
}, {
    passage: ['Start'],
    widget: 'aSimpleTest2',
});
```
并不是所有模块都是 passage 中的位置，有些位置独立在 passage 之外，它们的使用方法也和上述例子不同。例如，模块 `ModMenuSmall` 用于在左边栏添加小按钮。如果你想把 `aSimpleTest2` 放到左边栏小按钮的位置，就可以这么写：

```js
simpleFrameworks.addto('ModMenuSmall', 'aSimpleTest2');
```
实际上，在 passage 中的位置也可以这么写，例如：

```js
simpleFrameworks.addto('iModHeader', 'aSimpleTest2');
```

它的效果是在每个 passage 开头都加入 `aSimpleTest2` 的内容。

还有些模块并不是游戏界面上具体的位置，而是用于插入需要执行的代码，例如 `iModReady`。全部模块和部分模块代表的位置在下文列出。

#### 全部模块
以下是全部模块的名字：
```
ModSkillsBox
ModCharaDescription
ModCaptionDescription
ModCaptionAfterDescription
ModStatusBar
ModMenuBig
ModMenuSmall

BeforeLinkZone
ExtraLinkZone
ModShopZone

iModDone
iModReady
iModHeader
iModFooter
iModOptions
iModCheats
iModStatus
iModFame
iModInit
iModStatist
iModExtraStatist
```

#### 部分模块代表的位置
下面这张图展示了最简单的几种模块所代表的位置，更多解说可以[在这里](https://github.com/emicoto/DOLMods/blob/main/Simple%20Frameworks/temp/widget%20copy.twee)查看。

![example](https://i.niupic.com/images/2024/01/13/ffYi.png)

### 打包 MOD
现在，你已经在 `内容文件` 写好了内容，也在 `载入文件` 中通过简易框架把内容逐个加入到了游戏中。你需要做的只是把 MOD 打包了。

创建一个名为 `boot.json` 的文件，并在其中加入这些内容：

```json
{
    "name": "SfwExample", // MOD 的名字
    "version": "1.0.1", // MOD 的版本号
    "scriptFileList_inject_early": [
      "sfwExample.js" // 载入文件的名字
    ],
    "scriptFileList_earlyload": [],
    "scriptFileList_preload": [],
    "styleFileList": [],
    "scriptFileList": [],
    "tweeFileList": [
      "sfwExample.twee" // 内容文件的名字
    ],
    "imgFileList": [],
    "additionFile": [],
    "addonPlugin": [
      {
        "modName": "TweeReplacer",
        "addonName": "TweeReplacerAddon",
        "modVersion": "1.0.0",
        "params": []
      }
    ],
    "dependenceInfo": [
      {
        "modName": "TweeReplacer",
        "version": "^1.0.0"
      },
      {
        "modName": "ReplacePatcher",
        "version": "^1.0.0"
      },
      {
        "modName": "Simple Frameworks",
        "version": ">=1.0.0"
      }
    ]
}
```

之后，参考[这里](https://github.com/Lyoko-Jeremie/sugarcube-2-ModLoader#%E5%A6%82%E4%BD%95%E6%89%93%E5%8C%85Mod)将 MOD 打包为 zip 文件，就可以使用这个 MOD 了，不要忘记，在加载这个 MOD 前，先加载简易框架。

你可以将 `内容文件` 和 `载入文件` 分别拆分成多个 twee 文件和 js 文件，也可以把它们整理在文件夹里，只需在填写 `boot.json` 时把它们都正确写进去即可。

## 简化内容编写
除了便于添加内容，简易框架还提供了一些函数，可以简化内容的编写。你可以在 JavaScript 文件中直接使用这些函数，也可以在 twee 文件中以宏的形式使用它们。下面展示了在 twee 文件中使用部分这些函数的例子。完整的函数可以在[此处](https://github.com/emicoto/DOLMods/blob/52695d80a24e009b2882eab147a5fbf17ef19972/Simple%20Frameworks/scripts/simpleMacros.js)查看。

### 多语言支持
#### 常用文本的多语言
```HTML
<<set _link = getLan('next')>> <!--输出为“Next”或“继续”-->
<<link _link $passage>><</link>>
```
目前支持的常用文本请参见[此处](https://github.com/emicoto/DOLMods/blob/52695d80a24e009b2882eab147a5fbf17ef19972/Simple%20Frameworks/scripts/simpleMacros.js#L1)的 `setup.lang`。

#### 编写多语言内容
```HTML
<<lanswitch "English" "中文">>
```

### 根据性别输出不同内容
```HTML
<<print sexSwitch(
  "NPC内部名字，缺省时默认为pc，输入0则分配为当前路人",
  "若男性输出的内容",
  "若女性输出的内容",
)>>
```

### 根据NPC性别输出“男孩”或“女孩”
```HTML
<<nnpcboy "NPC内部名字，输入0则分配为当前路人">>
```
如果是英文，需要首字母大写，则使用 `nnpcBoy`。

### 根据态度输出不同内容
```HTML
<<print speechDif(
  "抗拒",
  "中立",
  "顺从",
)>>
```

### 随机输出内容
```HTML
<<randomdata>>
<<datas>>
随机内容A
<<datas>>
随机内容B
<<datas>>
随机内容C
<</randomdata>>
```

如果在randomdata之后输入rate，就可设置概率值来随机你的内容。

datas后的数值可以是：总值相加为100的方式从大到小排。

也可以是：数值按优先值的方式来填，数字越大的概率越高。

不管如何设置，内部都是根据 数值总值 / 随机数， 以占比值来进行对比抽选的。

```HTML
<<randomdata rate>>
<<datas 80>>
大约有80%概率会显示这段内容
在没有设置默认文本时
最大概率的文本将成为默认文本
<<datas 60>>
大约有60%概率会显示这段内容
<<datas 40>>
大约有40%概率会显示这段内容
<<datas>>
不输入数字则作为默认文本
<</randomdata>>
```

## 添加 NPC 与 特征
参考[此处](https://github.com/emicoto/DOLMods/blob/52695d80a24e009b2882eab147a5fbf17ef19972/simple%20new%20content/newNPC.js)。

## 添加纹身
与原版添加纹身的写法基本一致，但可以省略不需要进行设置的变量。

没有进行设置的变量则会设置为默认值。

通过框架添加的纹身将会自动排序添加进游戏系统中。

```Javascript
const myNewTatoos = [
    {
        key     : 'fifty_whore',  // 纹身ID， 必须是英文字母
        name    : '£50',          // 默认显示用的名称
        special : 'prostitution', // 特殊分类标记，这里是卖淫分类。默认为'none'
        degree  : 5000            // 如果是卖淫类纹身，degree则会是能获得的钱。默认为0
    },
    {
        key     : 'a_custom_tattoo',
        type    : 'text',         // 文字还是图案纹身，默认值为text。图案则输入object
        name    : 'Custom Tattoo',
        cn      : '自定义纹身',   // 需要显示中文的话。
        special : 'custom',
        arrow   : 1,             // 默认值为0。1=有，0=无。设置arrow则会表示有个箭头指向生殖器
        gender  : 'f',           // 纹身的性别，女f,男m，双性n，默认为'n'
        lewd    : 1,             // 是否变态纹身。1=是 0=否 默认为1。
    },
    {
        key     : 'venus_object',  //一个示范
        type    : 'object'
        name    : 'venus',
        cn      : '美神像',
        lewd    : 0
    }
];

setup.modTattoos.push(...myNewTatoos); //表格设置完后，推送到简易框架中。

```

## 添加物品
参考[此处](https://github.com/emicoto/DOLMods/blob/52695d80a24e009b2882eab147a5fbf17ef19972/simple%20new%20content/newItems.js)。

需要注意的是，物品系统还没完全从爱糖机模组独立，所以如果想用到物品相关功能，

需要将爱糖机也一起当作前置（当前版本）。

之后会根据情况逐步独立出来整合至简易框架中。

## 添加战斗动作
参考[此处](https://github.com/emicoto/DOLMods/blob/main/i%20Candy%20and%20Robot/0Scripts/1_database/actions.js)。

## 添加以 JavaScript 编写的宏
参考[此处](https://github.com/emicoto/DOLMods/blob/52695d80a24e009b2882eab147a5fbf17ef19972/simple%20new%20content/test.js)。

## 注册事件
参考[此处](https://github.com/emicoto/DOLMods/blob/main/i%20Candy%20and%20Robot/gamecode/Scene/SceneRegist.js)。

需要注意的是，事件系统还没完全从爱糖机模组独立，如果想用事件系统相干功能，

需要将爱糖机也一起当作前置版本（当前版本）。

不过这个事件框架在完成所有基础测试后，将会整合至简易框架当中。

## 简易框架能做什么和不能做什么
简易框架主要是用于添加内容和简化编写的。 

当然，也可以通过新的事件系统来对passage进行打补丁，这样就可以在不对源码进行修改的情况下，
对passage进行些许修改，添加事件分支，功能等等。

但以上方式都无法达到你想要的效果，则请请查看 [TweeReplacer](https://github.com/Lyoko-Jeremie/Degrees-of-Lewdity_Mod_TweeReplacer/) 的用法，或查看 ModLoader 自带的 [`getPassageData` 和 `updatePassageData` 方法](https://github.com/Lyoko-Jeremie/sugarcube-2-ModLoader/blob/ff638f59261874737c269880f6ff1a1a6e2db865/src/insertTools/MyMod/MyMod_script_preload_example.js)。
