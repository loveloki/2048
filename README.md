### Bug
- ~~新出现的块儿如果和上次新出现的块儿的位置一样，不执行动画。来自[MDN官方文档]（https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Tips）~~

### 考虑更改
- moveTo函数
  ```
  if (direction == 'left') {
    for (let i = 0; i < len; i++) {
        const notZero = []
        const zero = []
        for (let j = 0; j < len; j++) {
            const tile = this.chessboard[i][j]
            if (tile != 0) {
                notZero.push(tile)
            }else{
                zero.push(tile)
            }
        }
        this.chessboard[i] = [...notZero, ...zero]
    }
  }
  ```


