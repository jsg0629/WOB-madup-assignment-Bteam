# WOB-madup-assignment-Bteam

## 매드업 기업과제 (팀B)

🗓️ 05.23 ~ 05.25   

[👨🏻‍💻 github](https://github.com/POB-Frontend-4th-6team/WOB-madup-assignment-Bteam)   

### **배포 링크 🖱️** https://mapup6b.herokuapp.com/       

자세한 내용은 팀 노션을 참고해주세요!    

[📝 팀 노션](https://hot-brake-e0d.notion.site/6-B-7ca6a163a1404fd4891bfd98e7384482)

## 사용 기술

`TypeScript`, `React`, `Recoil`

`axios`, `classnames`, `date-fns`, `react-query`, `store`, `victory`, `victory-core`, `react-router-dom`

`json-server`

## 파일 구조

```
├─src
    ├─assets
    │  └─svgs
    ├─components
    ├─hooks
    │  ├─state
    │  └─worker
    ├─layout
    ├─routes
    │  ├─AdvertiseManage
    │  │  ├─AdvertiseModal
    │  │  │  ├─InputRadio
    │  │  │  ├─InputText
    │  │  │  └─ModalPortal
    │  │  ├─ContentCard
    │  │  └─utils
    │  ├─Dashboard
    │  │  ├─AdStatus
    │  │  │  ├─Chart
    │  │  │  └─StatusCard
    │  │  ├─CalendarModal
    │  │  └─CurrentStatusOfMedium
    │  └─_shared
    │      ├─Container
    │      ├─DropDown
    │      ├─Header
    │      ├─LNB
    │      │  └─components
    │      └─Loading
    ├─services
    ├─states
    ├─styles
    │  ├─base
    │  ├─constants
    │  └─mixins
    ├─types
    └─utils
```

## 실행 방법

- repository clone

```
git clone https://github.com/POB-Frontend-4th-6team/WOB-madup-assignment-Bteam.git
```

- 필요한 모듈 설치 & **json-server 전역 설치**
    
    json-server는 특정 프로젝트 폴더 내에 설치하는 것이 아니라 글로벌 영역에 설치해주셔야 합니다.
    

```
yarn install

yarn global add json-server
```

- 실행

```
yarn start:dev
```

- 서버 실행
    
    아래 명령어를 프로젝트 터미널에 입력하시면 로컬에서 서버가 활성화됩니다. 주소는 `localhost:3004` 입니다

```
yarn start
```

## 기능 소개

### 대시보드

![charts](https://user-images.githubusercontent.com/76952602/170402914-6bb72d58-54ea-40be-92e4-274ecf44c3d7.gif)

- 통합 광고 현황
    - 선택한 기간의 지표 합계와 이전 날짜 데이터를 비교해서 증감을 나타냅니다.
        - ex ) 사용자가 2022/04/14 ~ 2022/04/20 을 선택했다면, 이전 7일치 2022/04/07 ~ 2022/04/13 데이터와 비교하여 증감분을 나타냅니다.
    - 선택한 지표의 데이터를 차트로 나타냅니다.
        - 일간, 주간, 지표별로 선택이 가능합니다.

![current](https://user-images.githubusercontent.com/76952602/170410160-8e5d2931-377a-4955-8a2b-5c22bc83e424.gif)

- **매체 현황 차트**
    - 선택한 기간의 값 별 합계 대비 해당매체 값의 비율을 차트로 나타냅니다. x 축은 값의 key이고 y 축은 x축 key의 모든 매체 값을 합산하여 해당하는 매체의 비율을 나타냅니다 위의 gif 는 2022-02-01 ~ 2022-02-02 기간을 선택하였고 해당 key의 모든 매체 값 대비 해당 매체의 값 비율이 차트로 나타나는 것을 볼 수 있습니다.
- **매체 현황 테이블**
    - 기간을 선택하면 매체별로 각 기간의 값을 모두 합쳐서 Table에 Data를 띄웁니다. 위의 gif는 2022-02-01 ~ 2022-02-02 기간을 선택하였고 테이블 row는 각 매체, coulmn은 값의 key 입니다. (구글,페이스북,네이버,카카오의 0201 데이터 0202 데이터를 coulmn별로 합친 Data, ) 
    총계는 보이는 것과 같이 매체별 데이터까지  coulmn별로 합쳐줍니다.

### 광고 관리

![advertisement](https://user-images.githubusercontent.com/76952602/170405691-70c2f1c8-d1df-4aaa-8412-c1a3f17fdb4b.gif)

- 광고 리스트
    - 각각의 광고 정보를 리스트로 보여줍니다.
        - 처음 로드 시 로딩 화면을 보여줍니다.
    - 수정하기 버튼을 눌러 해당 광고 정보를 수정할 수 있습니다.
    - 광고 만들기 버튼을 눌러 새로운 광고를 추가할 수 있습니다.
    - 삭제 아이콘을 클릭하면 해당 광고 정보가 삭제됩니다.
        - 수정, 삭제, 추가된 정보는 json-server, Local Storage, Recoil에 각각 업데이트됩니다.
    - 상단의 ‘전체 광고’, ‘진행 광고’, ‘중지 광고’를 선택해 상태에 맞게 광고 리스트를 필터하여 보여줍니다.
