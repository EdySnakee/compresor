import { Component } from '@angular/core';
import {
  DataUrl,
  DOC_ORIENTATION,
  NgxImageCompressService,
  UploadResponse,
} from 'ngx-image-compress';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'compresor';

  imgResultBeforeCompress: DataUrl = '';
  imgResultAfterCompress: DataUrl = '';
  imgResultAfterResize: DataUrl = '';
  imgResultUpload: DataUrl = '';
  imgResultAfterResizeMax: DataUrl = '';
  imgResultMultiple: UploadResponse[] = [];

  constructor(private imageCompress: NgxImageCompressService) {}

  compressFile() {
    return this.imageCompress
      .uploadFile()
      .then(({ image, orientation, fileName }: UploadResponse) => {
        this.imgResultBeforeCompress = image;
        console.warn('Name:', fileName);
        console.warn(
          `Original: ${image.substring(0, 50)}... (${image.length} characters)`
        );
        console.warn('Tamaño en byts original:', this.imageCompress.byteCount(image));

        this.imageCompress
          .compressFile(image, orientation, 50, 50)
          .then((result: DataUrl) => {
            this.imgResultAfterCompress = result;
            console.warn(
              `Comprimida: ${result.substring(0, 50)}... (${
                result.length
              } characters)`
            );
            console.warn(
              'Tamaño de la imagen comprimida:',
              this.imageCompress.byteCount(result)
            );
          });
      });
  }


}
