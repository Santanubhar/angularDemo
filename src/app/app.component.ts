import { Component,OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})

export class AppComponent implements OnInit{
  title = 'Angular2 Semantic UI Demo';
  //ajaxResult = 'No Result';
	ajaxResultJSON = [];
  

  dataTableObj = null;

  constructor(private httpService: HttpService){}

  ngOnInit(){
    //alert("Ready");
    $('.menu .item').tab();
    
    $('.ui.dropdown').dropdown();

    $('#dataTab tfoot th').each( function () {
			
        var title = $(this).text();
        $(this).html( '<div class="ui input"> <input type="text" placeholder="Search '+title+'" /> </div>' );
    } );

    var table = $('#dataTab').DataTable();
    this.dataTableObj = table;
    // Apply the search
		    table.columns().every( function () {
		        var that = this;
		 
		        $( 'input', this.footer() ).on( 'keyup change', function () {
		            if ( that.search() !== this.value ) {
		                that
		                    .search( this.value )
		                    .draw();
		            }
		        } );
		    } );
  }

  renderDatatable()
  {
    this.dataTableObj.clear();
    this.dataTableObj.rows.add(this.ajaxResultJSON);
    this.dataTableObj.draw();
  }

  getDetails(){
    //alert($('#dropdownOptions').dropdown('get value')));
    if($('#dropdownOptions').dropdown('get value').trim().length > 0 )
    {
        this.httpService.getReports()
        .subscribe(
          (data: Response) => {
            console.log(data);
            //this.ajaxResult = JSON.stringify(data);  
			this.ajaxResultJSON = [];
            for(var i=0; i < data.orders.length; i++)
            {
              console.log(i);
              var tempVar = data.orders[i];
			  
              this.ajaxResultJSON.push([tempVar.order_id,tempVar.status,tempVar.date_placed,"$"+tempVar.price,]);
            }
            console.log(this.ajaxResultJSON);
            this.renderDatatable();
          },
          (data: Error) => {
            alert("Oops! Make sure that server is running on http://localhost:8080/reports.json");
          }
        );
    }
    else
    {
      alert("Please select an option from dropdown.")
    }
	  
  }
}
