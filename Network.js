window.addEventListener("DOMContentLoaded", init);

import * as THREE from 'three';
// WebVRの判定、遷移ボタンのスクリプト
import { VRButton } from "three/addons/webxr/VRButton.js";
// WebXRのポリフィルを読み込み
import WebXRPolyfill from "webxr-polyfill";
import { XRControllerModelFactory } from 'https://unpkg.com/three@0.150.1/examples/jsm/webxr/XRControllerModelFactory.js';
//PC上で滑らかにカメラコントローラーを制御する為に使用↓
import { OrbitControls } from 'https://unpkg.com/three@0.150.1/examples/jsm/controls/OrbitControls.js';
let controller1, controller2;
let controllerGrip1, controllerGrip2;

function init() {
  /* ----基本的な設定----- */
  // WebXRのポリフィルを有効にする
  const polyfill = new WebXRPolyfill();

  // サイズを指定
  const width = window.innerWidth;
  const height = window.innerHeight;

  // シーンの作成
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0e0e0);
  // レンダラーの作成
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(width, height);

  console.log(renderer);
  renderer.xr.enabled = true;// レンダラーのXRを有効化
  document.body.appendChild(renderer.domElement);
  // WebVRの開始ボタンをDOMに追加
  document.body.appendChild(VRButton.createButton(renderer));

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(90, width / height);


  // カメラ用コンテナを作成(3Dのカメラ？) 
  const cameraContainer = new THREE.Object3D();
  cameraContainer.add(camera);
  scene.add(cameraContainer);
  cameraContainer.position.x = 0;


  // 光源を作成
  {
    const spotLight = new THREE.SpotLight(
      0xffffff,
      4,
      2000,
      Math.PI / 5,
      0.2,
      1.5
    );
    spotLight.position.set(300, 300, -200);
    scene.add(spotLight);

    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    //光源を作成
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(0, 4, 0);
    scene.add(light);
  }
  /* ----基本的な設定----- */

  // 直線のジオメトリとマテリアルを作成(x)
  const lineGeometryX = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-100, 0, 0), // 始点
    new THREE.Vector3(100, 0, 0),  // 終点
  ]);

  // 直線のジオメトリとマテリアルを作成(y)
  const lineGeometryY = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, -100, 0), // 始点
    new THREE.Vector3(0, 100, 0),  // 終点
  ]);

  // 直線のジオメトリとマテリアルを作成(Z)
  const lineGeometryZ = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, -100), // 始点
    new THREE.Vector3(0, 0, 100),  // 終点
  ]);

  // //基準線の色
  const colorL = new THREE.LineBasicMaterial({ color: 0xffa500 });

  // 直線オブジェクトを作成
  const lineX = new THREE.Line(lineGeometryX, colorL);
  const lineY = new THREE.Line(lineGeometryY, colorL);
  const lineZ = new THREE.Line(lineGeometryZ, colorL);
  // 直線オブジェクトをシーンに追加
  scene.add(lineX);
  scene.add(lineY);
  scene.add(lineZ);

  //背景色の変更
  scene.background = new THREE.Color(0);

  // ノードとエッジを表示
  const numNodes = 217; // ノードの数
  const nodes = [];
  for (let i = 1; i <= numNodes; i++) {
    nodes.push({
      id: i,
      label: `Node ${i}`,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      z: Math.random() * 100 - 50
    });
  }

  // const edges = [];
  // for (let i = 0; i < numNodes - 1; i++) {
  //     edges.push({
  //         source: i,
  //         target: i + 1
  //     });
  // }
  const edges = [
    { source: 0, target: 1, weight: 1.57336928633009 },
    { source: 2, target: 3, weight: 1.76481542620161 },
    { source: 2, target: 4, weight: 1.57868329912046 },
    { source: 2, target: 5, weight: 1.60242065238749 },
    { source: 6, target: 7, weight: 1.64225785978264 },
    { source: 6, target: 8, weight: 1.52320160623223 },
    { source: 6, target: 9, weight: 1.11136837052261 },
    { source: 6, target: 10, weight: 1.08347122604556 },
    { source: 6, target: 11, weight: 1.14014055853377 },
    { source: 6, target: 12, weight: 1.65876228905482 },
    { source: 6, target: 13, weight: 1.70318646755895 },
    { source: 6, target: 14, weight: 1.58547602785854 },
    { source: 6, target: 15, weight: 1.61102763945438 },
    { source: 16, target: 17, weight: 1.10604530587018 },
    { source: 16, target: 18, weight: 1.49220162674617 },
    { source: 16, target: 19, weight: 1.78266711188765 },
    { source: 16, target: 20, weight: 1.6747944686196 },
    { source: 16, target: 21, weight: 1.08821912433204 },
    { source: 16, target: 22, weight: 2.11540657438077 },
    { source: 16, target: 23, weight: 1.14733373810399 },
    { source: 16, target: 24, weight: 1.19353703723471 },
    { source: 16, target: 25, weight: 1.16454048051976 },
    { source: 16, target: 26, weight: 1.26311452391807 },
    { source: 16, target: 27, weight: 1.06660401310436 },
    { source: 16, target: 28, weight: 2.4172141454857 },
    { source: 16, target: 29, weight: 1.21725155872366 },
    { source: 16, target: 30, weight: 1.09501761704844 },
    { source: 16, target: 31, weight: 1.24259123116026 },
    { source: 16, target: 32, weight: 1.43594393378097 },
    { source: 16, target: 33, weight: 1.63279645955487 },
    { source: 34, target: 35, weight: 1.73154882713185 },
    { source: 34, target: 36, weight: 1.16592396218127 },
    { source: 34, target: 37, weight: 1.47527750476345 },
    { source: 34, target: 38, weight: 2.00972636401484 },
    { source: 34, target: 39, weight: 1.48998244466389 },
    { source: 34, target: 40, weight: 1.35452287069276 },
    { source: 34, target: 41, weight: 1.85726291370641 },
    { source: 34, target: 42, weight: 2.21634103624229 },
    { source: 34, target: 43, weight: 1.53015140216927 },
    { source: 34, target: 44, weight: 1.28723187442209 },
    { source: 34, target: 45, weight: 1.22396373020078 },
    { source: 34, target: 46, weight: 1.66425951031387 },
    { source: 47, target: 48, weight: 1.6053408345018 },
    { source: 47, target: 49, weight: 1.38176753034972 },
    { source: 47, target: 50, weight: 1.08297111670904 },
    { source: 47, target: 51, weight: 1.64350037787676 },
    { source: 47, target: 52, weight: 1.51577679776765 },
    { source: 47, target: 53, weight: 1.31389849665953 },
    { source: 47, target: 54, weight: 1.06433583251157 },
    { source: 47, target: 55, weight: 1.36424857497476 },
    { source: 47, target: 56, weight: 1.53413297679672 },
    { source: 47, target: 57, weight: 1.54398518122197 },
    { source: 47, target: 58, weight: 1.34284045211464 },
    { source: 47, target: 59, weight: 1.86137925842776 },
    { source: 47, target: 60, weight: 1.10427022719377 },
    { source: 47, target: 61, weight: 1.2007321607931 },
    { source: 47, target: 62, weight: 1.26545570086651 },
    { source: 47, target: 63, weight: 1.33576613728875 },
    { source: 47, target: 64, weight: 1.43599250685362 },
    { source: 47, target: 65, weight: 1.55199439274345 },
    { source: 47, target: 66, weight: 3.17876024874695 },
    { source: 47, target: 67, weight: 2.24749934235308 },
    { source: 47, target: 68, weight: 1.53988312756469 },
    { source: 47, target: 69, weight: 1.43924186571319 },
    { source: 47, target: 70, weight: 1.08826575857596 },
    { source: 47, target: 71, weight: 1.2374773345188 },
    { source: 47, target: 72, weight: 1.08673231218652 },
    { source: 47, target: 73, weight: 1.34758388266949 },
    { source: 47, target: 74, weight: 1.19150749491089 },
    { source: 47, target: 75, weight: 1.1623263067309 },
    { source: 47, target: 76, weight: 1.34200378512832 },
    { source: 47, target: 77, weight: 2.27023531951646 },
    { source: 47, target: 78, weight: 1.09897196430249 },
    { source: 47, target: 79, weight: 1.54872736649863 },
    { source: 47, target: 80, weight: 1.19877266675961 },
    { source: 47, target: 81, weight: 1.42110903416245 },
    { source: 47, target: 82, weight: 1.62094093517477 },
    { source: 47, target: 83, weight: 2.18686673797563 },
    { source: 47, target: 84, weight: 3.01205218331863 },
    { source: 47, target: 85, weight: 1.95110487304203 },
    { source: 47, target: 86, weight: 1.70897930488346 },
    { source: 47, target: 87, weight: 1.6057099403038 },
    { source: 47, target: 88, weight: 3.0416519700164 },
    { source: 47, target: 89, weight: 1.06802535272139 },
    { source: 47, target: 90, weight: 1.68627166722416 },
    { source: 47, target: 91, weight: 1.92719584477618 },
    { source: 47, target: 92, weight: 2.24235712924239 },
    { source: 47, target: 93, weight: 1.11288654547355 },
    { source: 47, target: 94, weight: 2.24579293491431 },
    { source: 95, target: 96, weight: 2.67871000512283 },
    { source: 95, target: 97, weight: 1.57474589470395 },
    { source: 98, target: 99, weight: 1.39777959193538 },
    { source: 98, target: 30, weight: 1.16436496156445 },
    { source: 104, target: 105, weight: 1.28218819691205 },
    { source: 104, target: 106, weight: 1.08722447958549 },
    { source: 104, target: 107, weight: 1.71125113366661 },
    { source: 104, target: 108, weight: 1.66944903516012 },
    { source: 104, target: 109, weight: 1.57145157916472 },
    { source: 104, target: 110, weight: 1.32324527526595 },
    { source: 104, target: 111, weight: 1.09628635777665 },
    { source: 104, target: 112, weight: 2.41198639686034 },
    { source: 113, target: 114, weight: 1.15537980161104 },
    { source: 113, target: 115, weight: 2.03487541672945 },
    { source: 113, target: 116, weight: 1.78147607913693 },
    { source: 113, target: 117, weight: 1.22134947051909 },
    { source: 113, target: 118, weight: 1.54050513777453 },
    { source: 113, target: 119, weight: 1.65377536823908 },
    { source: 113, target: 120, weight: 1.06747908311191 },
    { source: 113, target: 121, weight: 1.92194180223949 },
    { source: 113, target: 122, weight: 1.35587584827573 },
    { source: 113, target: 123, weight: 1.0762066335734 },
    { source: 113, target: 124, weight: 1.16456696249171 },
    { source: 113, target: 125, weight: 1.4148847451569 },
    { source: 113, target: 126, weight: 1.19908256477399 },
    { source: 113, target: 127, weight: 1.40347896529735 },
    { source: 113, target: 128, weight: 1.64216474093568 },
    { source: 113, target: 129, weight: 1.55549735172889 },
    { source: 113, target: 130, weight: 1.26244559449109 },
    { source: 113, target: 131, weight: 1.54876770120968 },
    { source: 113, target: 132, weight: 2.28992919503154 },
    { source: 113, target: 133, weight: 1.37138227965368 },
    { source: 134, target: 135, weight: 1.15880868794987 },
    { source: 136, target: 137, weight: 1.79748357742438 },
    { source: 136, target: 138, weight: 1.12798402173234 },
    { source: 136, target: 139, weight: 1.81469447911022 },
    { source: 136, target: 140, weight: 1.19761422319762 },
    { source: 136, target: 141, weight: 2.1178047479116 },
    { source: 136, target: 142, weight: 1.34369399278172 },
    { source: 136, target: 143, weight: 1.2383285770828 },
    { source: 136, target: 144, weight: 1.10836785381112 },
    { source: 136, target: 145, weight: 1.35845888168565 },
    { source: 136, target: 146, weight: 1.19427735899865 },
    { source: 136, target: 147, weight: 2.76024007350201 },
    { source: 136, target: 148, weight: 1.40313412409083 },
    { source: 136, target: 149, weight: 1.26538976798573 },
    { source: 136, target: 150, weight: 1.11599266921698 },
    { source: 136, target: 151, weight: 1.30190020161349 },
    { source: 136, target: 152, weight: 1.32951058728355 },
    { source: 136, target: 153, weight: 1.2273751142169 },
    { source: 136, target: 154, weight: 2.95438788612101 },
    { source: 136, target: 155, weight: 1.13576736739623 },
    { source: 156, target: 157, weight: 1.25416431714331 },
    { source: 156, target: 158, weight: 1.34041496390768 },
    { source: 156, target: 159, weight: 1.43719731630413 },
    { source: 156, target: 160, weight: 1.34337517109734 },
    { source: 156, target: 161, weight: 1.15711167264009 },
    { source: 162, target: 163, weight: 1.06946946985038 },
    { source: 162, target: 164, weight: 1.10799668065968 },
    { source: 162, target: 165, weight: 1.12779391043921 },
    { source: 162, target: 166, weight: 1.35979594933909 },
    { source: 162, target: 167, weight: 1.09289081433958 },
    { source: 162, target: 168, weight: 1.52215641821378 },
    { source: 162, target: 169, weight: 1.54559850494959 },
    { source: 170, target: 171, weight: 2.42740977319153 },
    { source: 170, target: 172, weight: 1.41885341033019 },
    { source: 170, target: 173, weight: 1.2423538381798 },
    { source: 170, target: 174, weight: 2.24642046115268 },
    { source: 175, target: 176, weight: 1.62231099604221 },
    { source: 175, target: 177, weight: 1.19726573973915 },
    { source: 178, target: 179, weight: 2.34596689407457 },
    { source: 178, target: 180, weight: 2.17553442479806 },
    { source: 181, target: 182, weight: 1.17515531868862 },
    { source: 181, target: 183, weight: 1.09608402832335 },
    { source: 181, target: 184, weight: 1.48150329309837 },
    { source: 185, target: 186, weight: 1.3747631374803 },
    { source: 185, target: 187, weight: 1.24930630056029 },
    { source: 185, target: 188, weight: 1.31132013895497 },
    { source: 185, target: 189, weight: 1.51837666037999 },
    { source: 190, target: 191, weight: 2.02394270391109 },
    { source: 190, target: 192, weight: 1.56142618140811 },
    { source: 190, target: 193, weight: 1.06445758744234 },
    { source: 190, target: 194, weight: 1.18201698918842 },
    { source: 195, target: 196, weight: 1.72291176507212 },
    { source: 195, target: 197, weight: 1.17900265580336 },
    { source: 195, target: 198, weight: 1.69409686688831 },
    { source: 195, target: 199, weight: 1.94016230109877 },
    { source: 195, target: 200, weight: 1.41820079216118 },
    { source: 195, target: 201, weight: 1.42266392631089 },
    { source: 195, target: 202, weight: 1.85821181549122 },
    { source: 195, target: 203, weight: 1.54022018556751 },
    { source: 195, target: 204, weight: 1.42582803891782 },
    { source: 195, target: 205, weight: 1.71286000690717 },
    { source: 195, target: 206, weight: 1.18087625487349 },
    { source: 195, target: 207, weight: 2.17946949801135 },
    { source: 195, target: 208, weight: 1.14826772982704 },
    { source: 195, target: 209, weight: 1.18742433406454 },
    { source: 195, target: 210, weight: 1.73207160482766 },
    { source: 195, target: 211, weight: 1.93751297681115 },
    { source: 195, target: 212, weight: 1.4619949568567 },
    { source: 213, target: 214, weight: 1.08660158984362 },
    { source: 215, target: 216, weight: 1.3483249198892 }
  ]

  nodes.forEach(node => {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(node.x, node.y, node.z);
    scene.add(sphere);
  });

  edges.forEach(edge => {
    const sourceNode = nodes[edge.source];
    const targetNode = nodes[edge.target];
    const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(sourceNode.x, sourceNode.y, sourceNode.z), new THREE.Vector3(targetNode.x, targetNode.y, targetNode.z)]);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xafeeee });
    const line = new THREE.Line(geometry, lineMaterial);
    scene.add(line);
  });


  /* ----コントローラー設定----- */

  // コントローラーイベントの設定
  function onSelectStart() {
    this.userData.isSelecting = true;
  }
  function onSelectEnd() {
    this.userData.isSelecting = false;
  }

  //コントローラー取得
  controller1 = renderer.xr.getController(0);
  controller1.addEventListener('selectstart', onSelectStart);
  controller1.addEventListener('selectend', onSelectEnd);
  scene.add(controller1);
  controller2 = renderer.xr.getController(1);
  controller2.addEventListener('selectstart', onSelectStart);
  controller2.addEventListener('selectend', onSelectEnd);
  scene.add(controller2);

  //コントローラーモデルを取得
  const controllerModelFactory = new XRControllerModelFactory();
  controllerGrip1 = renderer.xr.getControllerGrip(0);
  controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
  scene.add(controllerGrip1);
  controllerGrip2 = renderer.xr.getControllerGrip(1);
  controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
  scene.add(controllerGrip2);
  //コントローラーから出る光線の作成				
  const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, - 1)]);
  const mat = new THREE.LineBasicMaterial({ color: 0x8a2be2 });
  const line = new THREE.Line(geo, mat);
  line.name = 'line';
  line.scale.z = 1;//光線の長さ
  controller1.add(line.clone());
  controller2.add(line.clone());


  //機能
  function handleController(controller) {
    const userData = controller.userData;
    const stickThreshold = 0.5;

    if (controller.axes && controller.axes.length >= 2) {
      const stickX = controller.axes[0];
      const stickY = controller.axes[1];

      // スティックが一定の閾値以上であれば処理を実行
      if (Math.abs(stickX) > stickThreshold && Math.abs(stickY) > stickThreshold) {
        // スティックが入力された際の処理
        console.log('スティックが入力されました');
        cameraContainer.position.z += 1;
        controller1.position.z += 1;
        controller2.position.z += 1;
      }
    }
  }
  /* ----コントローラー設定----- */

  // レンダラーにループ関数を登録
  renderer.setAnimationLoop(tick);

  // 毎フレーム時に実行されるループイベント
  function tick() {
    // レンダリング
    handleController(controller1);
    handleController(controller2);
    renderer.render(scene, camera);
  }

  // リサイズ処理
  window.addEventListener("resize", onResize);
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
