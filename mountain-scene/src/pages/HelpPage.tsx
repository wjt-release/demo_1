import { Link } from 'react-router-dom'

export default function HelpPage() {
  return (
    <div className="helpPage">
      <div className="helpTop">
        <div className="helpTitle">
          <div className="helpKicker">地形观测</div>
          <h1>3D 山脉场景</h1>
        </div>
        <Link className="helpBack" to="/">
          返回场景
        </Link>
      </div>

      <div className="helpGrid">
        <section className="helpCard">
          <h2>交互</h2>
          <ul>
            <li>拖动：旋转视角</li>
            <li>滚轮 / 双指：缩放</li>
            <li>右键 / 双指拖动：平移</li>
            <li>面板：切换等高线、控制昼夜与播放速度</li>
          </ul>
        </section>

        <section className="helpCard">
          <h2>模式</h2>
          <ul>
            <li>昼夜：通过时间控制改变太阳/天空/雾与整体色调</li>
            <li>等高线：在地形着色上叠加高度线，密度可调</li>
            <li>河流：沿山谷蜿蜒，通过高光与流动形成视觉锚点</li>
          </ul>
        </section>

        <section className="helpCard">
          <h2>性能</h2>
          <ul>
            <li>移动端建议关闭等高线或降低密度</li>
            <li>如出现卡顿，可暂停播放，减少实时变化</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

