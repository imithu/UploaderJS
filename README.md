# UploadJS


## Features
- Drag and Drop Upload
- Click Upload
- file size - only 5.4 KB


## Screenshot
![main](Docs/eg2.png)
![main](Docs/eg1.png)




## Guide
``` js
// <script src='src/uploader.js'></script>  - include the uploader.js file
new UploaderJS({
    selector_input: '#UploaderJS_input_click',
    selector_drop: '#UploaderJS_upload_zone',
    url: 'upload.*',          // post url
    form_data: {              // form_data is optional
        name: 'UploaderJS',
    }
});
```



## Thank you very much.