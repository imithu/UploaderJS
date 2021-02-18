/**
 * UploaderJS v1.0.1 (https://github.com/imithu/UploaderJS)
 * Licensed under MIT (https://github.com/imithu/UploaderJS/blob/master/LICENSE)
 */
'use strict';



class UploaderJS{
    /**
     * 
     * name
     * 
     * @var string name
     * 
     * @since   1.0.0
     * @version 1.0.0
     * @author  Mahmudul Hasan Mithu
     */
    static name = 'UploaderJS';
    /**
     * 
     * version
     * 
     * @var string version
     * 
     * @since   1.0.0
     * @version 1.0.0
     * @author  Mahmudul Hasan Mithu
     */
    static version = 'v1.0.0';
    /**
     * 
     * file number
     * 
     * @var number file_number
     * 
     * @since   1.0.0
     * @version 1.0.0
     * @author  Mahmudul Hasan Mithu
     */
    static file_number = 0;

    /**
     * 
     * config
     * 
     * @var object config
     * 
     * @since   1.0.0
     * @version 1.0.0
     * @author  Mahmudul Hasan Mithu
     */
    static config = {
        selector_input: '',
        selector_drop: '',
        url: '',
        form_data: {}
    };


    /**
     * constructor
     * 
     * @param object config
     * 
     * @since   1.0.0
     * @version 1.1.0
     * @author  Mahmudul Hasan Mithu
     */
    constructor( config ){
        UploaderJS.config = config;

        let files_input = document.querySelector(UploaderJS.config.selector_input);
        files_input.onchange = function(){
            let files = files_input.files;
        
            for(let file=0;file<files.length;file++){
                UploaderJS.create_file_progress(files[file]);
                UploaderJS.upload_file(files[file]);
            }
        }


        let upload_zone = document.querySelector(UploaderJS.config.selector_drop);
        upload_zone.ondragover = function(e){
            e.preventDefault();
        }
        upload_zone.ondrop = function(e){
            e.preventDefault();
            let files = e.dataTransfer.files;
        
            for(let file=0;file<files.length;file++){
                UploaderJS.create_file_progress(files[file]);
                UploaderJS.upload_file(files[file]);
            }
        }
    }


    /**
     * create file progress
     * 
     * @param object file
     * 
     * @since   1.0.0
     * @version 1.0.0
     * @author  Mahmudul Hasan Mithu
     */
    static create_file_progress(file){
        this.file_number++;

        let progress_zone = document.querySelector("#UploaderJS_progress_zone");
    
        // generate file image
        let image = `<div style="color: #6f42c1;"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-image-alt" viewBox="0 0 16 16"><path d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5l-4.777-3.947z"/></svg></div>`;
        if( file.type=="image/jpeg" || file.type=="image/png" || file.type=="image/svg+xml" ) 
            image = `<img src="${URL.createObjectURL(file)}" class="img-fluid"></img>`;

        let html = `
        <div class="row" id="${this.name}_file_${this.file_number}">
            <div class="col-2">
                ${image}
            </div>
            <div class="col-10">
                <div class="mb-1">Status: <span id="${String(this.name+"_file_progress_status_"+this.file_number)}">Hold</span> - ${file.name} </div>
                <div class="progress"><div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" id="${String(this.name+"_file_progress_bar_"+this.file_number)}" style="width: 0%;">0%</div></div>
            </div>
        </div>
        `;
        if(this.file_number!=1)html += "<hr>";
    
    
    
        progress_zone.insertAdjacentHTML("afterbegin",html);
    }


    /**
     * upload file
     * 
     * @param object file
     * 
     * @since   1.0.0
     * @version 1.0.0
     * @author  Mahmudul Hasan Mithu
     */
    static upload_file(file){
        let fd = new FormData();
        for(let key in this.config.form_data){
            fd.append( key, this.config.form_data[key] );
        };
        fd.append(`${this.name}_file`,file);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.config.url, true);
        this.upload_progress(xhr,this.file_number);
        xhr.send(fd);
    
        fd = null;
    }


    /**
     * upload file
     * 
     * @param object xhr
     * @param number file_number
     * 
     * @since   1.0.0
     * @version 1.0.0
     * @author  Mahmudul Hasan Mithu
     */
    static upload_progress(xhr, file_number){
        xhr.upload.onprogress = function(e){
            let file_progress_status  = document.querySelector( `#${String(UploaderJS.name+"_file_progress_status_"+file_number)}` );
            let file_progress_bar     = document.querySelector( `#${String(UploaderJS.name+"_file_progress_bar_"+file_number)}` );
            

            let width = Math.round((e.loaded/e.total)*100);

            // working with progress bar
            file_progress_bar.style.width = width+'%';
            file_progress_bar.innerText   = width+'%';

            //change file status and progress bar color
            if(width>0){
                file_progress_status.innerHTML = "Uploading";
            }
            if(width>=100){
                file_progress_status.innerHTML = "Uploaded";
                file_progress_status.classList.add("text-success");

                file_progress_bar.classList.value = "progress-bar bg-success";
            }
        }
    }
}