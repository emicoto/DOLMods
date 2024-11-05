function getMaxStack(itemId, mode = 'inv') {
    const itemData = Items.get(item);
    const size = SFInventory.maxStacks(itemData.size);
    const { maxsize, boostsize, disableStack } = SFInventory.config;
    
    if (!itemData) {
        console.error(`Item with id ${itemId} not found`);
        return 0;
    }
    else if (size == null) {
        return 1;
    }
    else if (disableStack) {
        // if disabled stacking return a super large number
        return Math.pow(10, 20);
    }

    
    if (mode == 'raw') {
        return size;
    }

    return Math.clamp(size * boostsize, 1, maxsize);
}
