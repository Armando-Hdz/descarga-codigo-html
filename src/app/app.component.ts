import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  datosTabla = [];

  @ViewChild('miTabla') miTabla: ElementRef;

  config: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'mytable',
    options: {
      jsPDF: {
        orientation: 'landscape'
      },
      pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    }
  };

  constructor(
    private exportAsService: ExportAsService
  ) {
    const elementos = [];
    for (let i = 0; i < 1000; i++) {
      const elemento = {
        id: i,
        nombre: 'hola' + i,
        tamanio: 180 + i,
        peso: 73 + i,
        edad1: 20 + i,
        edad2: (20 * i) + i,
        edad3: (20 * i) + i,
        edad4: (20 * i) + i,
        edad5: (20 * i) + i,
        edad6: (20 * i) + i,
        edad7: (20 * i) + i,
        edad8: (20 * i) + i,
        edad9: (20 * i) + i,
        edad10: (20 * i) + i,
        edad11: (20 * i) + i,
        edad12: (20 * i) + i,
        edad13: (20 * i) + i,
        edad14: (20 * i) + i,
        edad15: (20 * i) + i,
        edad16: (20 * i) + i,
        edad17: (20 * i) + i,
        edad18: (20 * i) + i,
        edad19: (20 * i) + i,
        edad20: (20 * i) + i,
        edad21: (20 * i) + i,
        edad22: (20 * i) + i,
        edad23: (20 * i) + i,
        edad24: (20 * i) + i,
        edad25: (20 * i) + i,
        edad26: (20 * i) + i,
        edad27: (20 * i) + i,
        edad28: (20 * i) + i,
      };
      elementos.push(elemento);
    }
    this.datosTabla = elementos;
  }

  exportAsString(type: SupportedExtensions, opt?: string) {
    this.config.elementIdOrContent = '<div> test string </div>';
    this.exportAs(type, opt);
    setTimeout(() => {
      this.config.elementIdOrContent = 'mytable';
    }, 1000);
  }

  exportAs(type: SupportedExtensions, opt?: string) {
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
    }
    this.exportAsService.save(this.config, 'myFile').subscribe(() => {
      // save started
    });
    // this.exportAsService.get(this.config).subscribe(content => {
    //   const link = document.createElement('a');
    //   const fileName = 'export.pdf';

    //   link.href = content;
    //   link.download = fileName;
    //   link.click();
    //   console.log(content);
    // });
  }

  pdfCallbackFn(pdf: any) {
    // example to add page number as footer to every page of pdf
    const noOfPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    }
  }

  descargarHtml() {
    const tablaNombre = 'tabla.html';
    const tabla = this.miTabla.nativeElement.innerHTML;
    const body = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      ${tabla}
    </body>
    </html>`;
    this.downloadInnerHtml(tablaNombre, body, null);
  }

  downloadInnerHtml(filename, innerHtml, mimeType) {
    const link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(innerHtml));
    link.click();
  }

}

