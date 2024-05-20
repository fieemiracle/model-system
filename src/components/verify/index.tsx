import { useEffect, useRef, useState } from 'react'

function VerifyWrap() {
    const vertify = useRef(null)
    const state = useRef({
        pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        imgCode: ''
    })

    useEffect(() => {
        // 开始生成验证码
        state.imgCode = draw();
        sendImgCode();
    }, [])

    // 随机生成数字
    const randomNum = (min: number, max: number): number => {
        return Math.floor((Math.random() * (max - min) + min));
    }

    // 随机生成颜色
    const randomColor = (min: number, max: number) => {
        const r = randomNum(min, max);
        const g = randomNum(min, max);
        const b = randomNum(min, max);
        return `rgb(${r},${g},${b})`;
    }

    const draw = () => {
        // ref功能: 1. 将原始数据类型变成响应式;2.
        // 生成一个2d画布
        const ctx = vertify.getContext('2d')
        // 填充颜色
        ctx.fillStyle = randomColor(180, 230)
        ctx.fillRect(0, 0, 120, 40)
        // 随机生成四个字符（验证码）
        let imgCode = ''
        for (let i = 0; i < 4; i++) {
            // 获得随机下标的字符
            const text = state.pool[randomNum(0, state.pool.length)]
            imgCode += text
            // 随机设置字体大小
            const fontSize = randomNum(18, 40)
            // 随机设置字体旋转角度
            const deg = randomNum(-30, 30)
            // 设置字体大小和样式
            ctx.font = fontSize + 'px Simhei'
            ctx.textBaseline = 'top'
            ctx.fillStyle = randomColor(80, 150)
            ctx.save()
            ctx.translate(30 * i + 15, 15)
            ctx.rotate((deg * Math.PI) / 180)
            // 将文字绘制到画布上(绘制的文字，x轴，y轴)
            ctx.fillText(text, -10, -15)
            ctx.restore()

        }
        // 5.随机产生5条干扰线,干扰线的颜色要浅一点
        for (let i = 0; i < 5; i++) {
            ctx.beginPath()
            ctx.moveTo(randomNum(0, 120), randomNum(0, 40))
            ctx.lineTo(randomNum(0, 120), randomNum(0, 40))
            ctx.strokeStyle = randomColor(180, 230)
            ctx.closePath()
            ctx.stroke()
        }
        // 6.随机产生40个干扰的小点
        for (let i = 0; i < 40; i++) {
            ctx.beginPath()
            ctx.arc(randomNum(0, 120), randomNum(0, 40), 1, 0, 2 * Math.PI)
            ctx.closePath()
            ctx.fillStyle = randomColor(150, 200)
            ctx.fill()
        }
        return imgCode
    }

    const handleDraw = () => {
        state.imgCode = draw();
        sendImgCode()
    }
    const emits = defineEmits(['sendImgCode']);
    const sendImgCode = () => {
        emits('sendImgCode', state.imgCode)
    }

    return (
        <>
            <div className="verify-wrapper">
                <canvas width="110" height="30" ref={vertify} onClick={handleDraw}></canvas>
            </div>
        </>
    )
}

export default VerifyWrap