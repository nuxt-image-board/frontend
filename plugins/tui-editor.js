/* めちゃくちゃ邪魔だが、グローバルに登録してclient-onlyで動かさないとエラー... */
import Vue from 'vue'
import { Editor, Viewer } from '@toast-ui/vue-editor'
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'

Vue.component('editor', Editor)
Vue.component('viewer', Viewer)
