import store from "../../store";
import electron from 'electron'
import juice from 'juice'


let icon = `
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
     y="0px"
     width="24px" height="24px"
     viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
    <g>
        <path d="M192,32C85.952,32,0,103.648,0,192c0,50.944,28.736,96.128,73.312,125.376L48,368l68.96-29.536
            c14.784,5.248,30.144,9.568,46.56,11.584c-2.24-9.76-3.52-19.776-3.52-30.048c0-88.224,86.112-160,192-160
            c9.696,0,19.168,0.8,28.512,1.952C363.616,87.968,285.696,32,192,32z
            M128,152c-13.248,0-24-10.752-24-24s10.752-24,24-24
            s24,10.752,24,24S141.248,152,128,152z
            M256,152c-13.248,0-24-10.752-24-24s10.752-24,24-24s24,10.752,24,24S269.248,152,256,152z"
        />
    </g>
    <g>
        <path d="M512,320c0-70.688-71.648-128-160-128s-160,57.312-160,128s71.648,128,160,128c14.528,0,28.352-2.048,41.76-4.96L480,480
            l-29.824-59.616C487.552,396.96,512,360.928,512,320z
            M304,312c-13.248,0-24-10.752-24-24s10.752-24,24-24s24,10.752,24,24
            S317.248,312,304,312z
            M400,312c-13.248,0-24-10.752-24-24s10.752-24,24-24s24,10.752,24,24S413.248,312,400,312z"
        />
    </g>
</svg>
`;


let button = {
    register: editor => {
        editor.ui.registry.addIcon('wechat', icon);
        editor.ui.registry.addButton('wechat', {
            icon: 'wechat',
            tooltip: '复制到微信',
            onAction: () => {
                electron.clipboard.writeHTML(juice(store.getters.content_with_style));
            }
        });
    }
};

export default button;