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
  scene.background = new THREE.Color( 0xe0e0e0 );
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
		const light = new THREE.DirectionalLight( 0xffffff, 0.5 );
		light.position.set( 0, 4, 0 );
		scene.add( light );
  }
  /* ----基本的な設定----- */
  

  // 直線のジオメトリとマテリアルを作成(x)
  const lineGeometryX = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-50, 0, -0), // 始点
    new THREE.Vector3(50, 0, -0),  // 終点
  ]);

  // 直線のジオメトリとマテリアルを作成(y)
  const lineGeometryY = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, -50, 0), // 始点
    new THREE.Vector3(0, 50, 0),  // 終点
  ]);

  // 直線のジオメトリとマテリアルを作成(Z)
  const lineGeometryZ = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, -50), // 始点
    new THREE.Vector3(0, 0, 50),  // 終点
  ]);

  //基準線の色
  const red = new THREE.LineBasicMaterial({ color: 0x000000 });

  // 直線オブジェクトを作成
  const lineX = new THREE.Line(lineGeometryX , red);
  const lineY = new THREE.Line(lineGeometryY , red);
  const lineZ = new THREE.Line(lineGeometryZ , red);
  // 直線オブジェクトをシーンに追加
  scene.add(lineX);
  scene.add(lineY);
  scene.add(lineZ);

  //背景色の変更
  scene.background = new THREE.Color(255,255,255);

  // ノードとエッジを表示
  const numNodes = 100; // ノードの数
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
  
  const edges = [];
  for (let i = 0; i < numNodes - 1; i++) {
      edges.push({
          source: i,
          target: i + 1
      });
  }
  
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
  // // 立方体の作成
  // const cube = createCube();
  // cube.position.set( 0, 0, -500);
  // scene.add(cube);


  /* ----コントローラー設定----- */
  
  // コントローラーイベントの設定
  function onSelectStart() {
    this.userData.isSelecting = true;
  }
  function onSelectEnd() {
    this.userData.isSelecting = false;
  }	

  //コントローラー取得
  controller1 = renderer.xr.getController( 0 );
  controller1.addEventListener( 'selectstart', onSelectStart );
  controller1.addEventListener( 'selectend', onSelectEnd );
  scene.add( controller1 );
  controller2 = renderer.xr.getController( 1 );
  controller2.addEventListener( 'selectstart', onSelectStart );
  controller2.addEventListener( 'selectend', onSelectEnd );
  scene.add( controller2 );

  //コントローラーモデルを取得
  const controllerModelFactory = new XRControllerModelFactory();
  controllerGrip1 = renderer.xr.getControllerGrip(0);
  controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) );
  scene.add( controllerGrip1 );
  controllerGrip2 = renderer.xr.getControllerGrip(1);
  controllerGrip2.add( controllerModelFactory.createControllerModel( controllerGrip2 ) );
  scene.add( controllerGrip2 );
  //コントローラーから出る光線の作成				
  const geo = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 )]);
  const mat = new THREE.LineBasicMaterial({color: 0x8a2be2});
  const line = new THREE.Line( geo , mat );
  line.name = 'line';
  line.scale.z = 1;//光線の長さ
  controller1.add( line.clone() );
  controller2.add( line.clone() );
  

  //機能
	function handleController( controller ) {
		const userData = controller.userData;
		if ( userData.isSelecting === true ) {//コントローラーボタンが押された際の処理
      
      // const cube = createCube();
      // cube.position.set(
      //   Math.random() * -1000 - 300,  // x座標を-5から5の範囲でランダムに設定
      //   0,  // y座標
      //   Math.random() * -1000 - 300   // z座標を-5から5の範囲でランダムに設定
      // );
      // scene.add(cube);
		} else {
      
		}
	}
  /* ----コントローラー設定----- */
  

  // 立方体を生成する関数
  function createCube() {
    const geometry = new THREE.BoxGeometry(100,100,100);
    const material = new THREE.MeshBasicMaterial({ color: getRandomColor() });//のっぺりとした影が出来ない
    //const material = new THREE.MeshPhongMaterial({ color: getRandomColor() });//光沢感が出る
    //const material = new THREE.MeshStandardMaterial({ color: getRandomColor() });//現実の物理現象を再現する
    const cube = new THREE.Mesh(geometry, material);
    return cube;
  }
    // ランダムな色を生成する関数
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // レンダラーにループ関数を登録
  renderer.setAnimationLoop(tick);
  
  // 毎フレーム時に実行されるループイベント
  function tick() {
    // レンダリング
    handleController( controller1 );
		handleController( controller2 );
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

