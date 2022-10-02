<template>
  <div style="margin-bottom: 5px; border-radius: 10px">
    <el-upload
      class="editor-img-uploader"
      action=" https://yibindfxy.top:444/application/upload/file"
      :show-file-list="false"
      :headers="headers"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      name="file[]"
    >
      <i class="el-icon-plus editor-img-uploader"></i>
    </el-upload>
    <QuillEditor
      id="editorId"
      ref="myQuillEditor"
      v-model:content="content"
      theme="snow"
      contentType="html"
      :options="options"
    />
  </div>
</template>

<script >
import { QuillEditor, Quill } from "@vueup/vue-quill";
import { reactive, ref, toRaw } from "vue";
import config from "../api/config";
import { ElMessage } from "element-plus";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
// import 
export default {
  components: { QuillEditor },
  props: {
    // 富文本编辑器
    getContent: { type: String, default: "" },
  },
  setup(props) {
    let content = ref("");
    content.value = props.getContent;
    let upLoadUrl = ref(
      config.baseUrl.product +
        "/api/uploadFileTwo?token=" +
        sessionStorage.getItem("token")
    );
    let headers = reactive({
      token: sessionStorage.getItem("token"),
    });
    const myQuillEditor=ref(null)
    const options = reactive({
      modules: {
        toolbar: {
          container: [
            [{ size: ["small", false, "large"] }],
            ["bold", "italic", "underline"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }]
          ],
          handlers: {
            image: function (value) {
              if (value) {
                // 调用element图片上传
                document
                  .querySelector(".editor-img-uploader>.el-upload")
                  .click();
              } else {
                Quill.format("image", true);
              }
            },
          },
        },
        history: {
          delay: 1000,
          maxStack: 50,
          userOnly: false
        },
        options: {
          upload: file => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("image", file);
              console.log(file);
              // req.post('/upload-image', formData)
              //   .then(res => {
              //     console.log(res)
              //     resolve(res.data.url);
              //   })
              //   .catch(err => {
              //     reject("Upload failed");
              //     console.error("Error:", err)
              //   })
            })
          }
        }
      },
    });
    // 图片上传成功返回图片地址
    function handleAvatarSuccess(res, file) {
      // 如果上传成功
      if (res) {
        // 获取富文本实例
        let quill = toRaw(myQuillEditor.value).getQuill();
        // 获取光标位置
        let length = quill.selection.savedRange.index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, "image", res);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        ElMessage({
          message: "提交失败！",
          type: "error",
        });
      }
    }
    // 图片上传前拦截
    function beforeAvatarUpload(file) {
      const type = ["image/jpeg", "image/jpg", "image/png", "image/svg"];
      const isJPG = type.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        ElMessage({
          message: "图片格式错误",
          type: "success",
        });
      }
      if (!isLt2M) {
        ElMessage({
          message: "上传图片不能超过" + size.value + "M",
          type: "success",
        });
      }
      return isJPG && isLt2M;
    }
    return {
      options,
      content,
      upLoadUrl,
      headers,
      myQuillEditor,
      handleAvatarSuccess,
      beforeAvatarUpload
    };
  },
};
</script>
<style scoped lang='less'>
.editor-img-uploader {
  display: none;
}
.ql-editor {
  min-height: 300px;
}
</style>
