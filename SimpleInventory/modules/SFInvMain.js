//----------------------------------
//
// Simple Inventory Main Object and Settings
//
//----------------------------------

// 创建一个立即调用的函数表达式 (IIFE) 来定义 SFInventory 对象
const SFInventory = (() => {
    // 配置对象，用于存储最大容量、增量容量和堆叠开关
    const _config = {
        maxsize      : 100,    // 最大容量，默认为 100
        boostsize    : 1,      // 增量容量，默认为 1
        disableStack : false   // 是否禁用堆叠功能，默认为 false
    };

    // 选项对象，用于定义资源路径、物品类型和规则
    const _options = {
        imgRoot : 'SFInv/',    // 图片资源的根目录
        types   : [],          // 物品类型列表
        rules   : []           // 物品规则列表
    };

    // 尺寸数据对象，存储不同类型物品的默认大小
    const _sizeData = {
        pill    : 60,  // 药丸
        inject  : 12,  // 注射器
        cans    : 12,  // 罐头
        bottles : 4,   // 瓶子
        snacks  : 8,   // 零食
        mealbox : 4,   // 饭盒
        fruits  : 12,  // 水果
        micro   : 62,  // 微型物品
        tiny    : 32,  // 小物件
        small   : 16,  // 较小物件
        medium  : 8,   // 中等物件
        big     : 4,   // 大物件
        large   : 1,   // 超大物件

        // 添加新尺寸数据的方法
        add(obj) {
            for (const key in obj) {
                this[key] = obj[key];
            }
        }
    };

    // 导入配置数据的方法，从外部模块获取配置
    function _import() {
        const { maxsize, boostsize, disableStack } = iMod.getCf('SimpleInventory');
        _config.maxsize = maxsize;
        _config.boostsize = boostsize;
        _config.disableStack = disableStack;
    }

    // 导出当前配置到外部模块的方法
    function _export() {
        iMod.setCF('SimpleInventory', _config);
    }

    // 获取指定大小的最大容量，如果 size 是已知类型则返回对应容量
    function _getMaxSize(size) {
        const data = _sizeData[size];

        if (data) {
            return data.size;  // 如果数据存在，返回物品的容量
        }
        else if (typeof size === 'number') {
            return size;  // 如果传入的 size 是数字类型，直接返回
        }

        return null;  // 如果都不匹配，返回 null
    }

    // 定义库存规则类，用于初始化库存
    class InventoryRules {
        constructor(Id = 'default', type = 'pc', slot = 'backpack', size = 12) {
            this.ruleId = Id;    // 规则 ID
            this.type = type;    // 库存类型 (例如 pc)
            this.slot = slot;    // 插槽类型 (例如 backpack)
            this.size = size;    // 插槽容量
        }

        // 初始化方法，设置 V.SFInv 中对应的槽位
        init() {
            if (!V.SFInv[this.type]) {
                V.SFInv[this.type] = {};  // 如果 V.SFInv 中没有该类型，初始化为空对象
            }

            if (!V.SFInv[this.type][this.slot]) {
                if (this.size === 'infinity') {
                    this.size = 0;  // 如果容量是无限的，将其设为 0
                }

                V.SFInv[this.type][this.slot] = new Inventory(this.type, this.slot, this.size);

                if (this.size === 0) {
                    V.SFInv[this.type][this.slot].limitsize = 'infinity';
                    V.SFInv[this.type][this.slot] = {};  // 设置为无限大小的槽
                }
            }
        }

        // 获取当前库存规则关联的插槽
        get() {
            this.init();
            return V.SFInv[this.type][this.slot];
        }
    }

    // 将 InventoryRules 类定义为全局不可修改的属性
    Object.defineProperty(window, 'InventoryRules', {
        value        : InventoryRules,
        writable     : false,    // 禁止修改
        configurable : false     // 禁止重新定义
    });

    // 冻结并返回 SFInventory 对象，防止进一步修改
    return Object.freeze({
        config   : _config,      // 导出配置信息
        options  : _options,     // 导出选项信息
        sizeData : _sizeData,    // 导出尺寸数据
        import   : _import,      // 导出 import 方法
        export   : _export,      // 导出 export 方法
        maxsize  : _getMaxSize,  // 导出获取最大容量的方法
        getTypes : () => _options.types,  // 获取物品类型的方法
        getRules : () => _options.rules   // 获取规则的方法
    });
})();
