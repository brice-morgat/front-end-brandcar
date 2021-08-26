import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrandCar } from '../models/brandcars.model';
import { BrandcarsService } from '../services/brandcars.service';

@Component({
  selector: 'app-brandcars-list',
  templateUrl: './brandcars-list.component.html',
  styleUrls: ['./brandcars-list.component.scss']
})
export class BrandcarsListComponent implements OnInit {
  viewMode: boolean = false;

  brandcar: BrandCar;
  brandcars: BrandCar[];
  brandForm: FormGroup = this.formBuilder.group({});

  constructor(private modalService: NgbModal, private brandcarsService: BrandcarsService, private formBuilder: FormBuilder) {
    this.getBrands()
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.brandForm = this.formBuilder.group({
      brandName: ['', [Validators.required]],
      description: ['']
    });
  }

  /** Change view mode */
  public onChangeViewMode(){
    if(this.viewMode === false) 
      this.viewMode = true;
    else 
      this.viewMode = false;
  }

  public getBrands() {
    this.brandcarsService.getBrandcars().subscribe(
      (brandcars: BrandCar[]) => {
        this.brandcars = brandcars;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public onAddBrand() {
    let newBrandcars : BrandCar = new BrandCar();
    newBrandcars.brandName = this.brandForm.get('brandName').value;
    newBrandcars.description = this.brandForm.get('description').value;

    this.brandcarsService.addBrandcar(newBrandcars).subscribe(
      (brandcar: BrandCar) => { 
        console.log('Brand Cars has been add');
        this.getBrands();
      },
      (error) => {
        console.log(error);
    });
  }

  public onModifyBrand(brandCar: BrandCar) {
    brandCar.brandName = this.brandForm.get('brandName').value;
    brandCar.description = this.brandForm.get('description').value;

    this.brandcarsService.updateBrandcars(brandCar.id, brandCar).subscribe(
      (brandCar: BrandCar) => {
        console.log('Brand Car has been modified');
        this.getBrands();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public onRemoveBrand(id: number) {
    this.brandcarsService.deleteBrandcar(id).subscribe(
      (res: void) => {
        console.log(res);
        this.getBrands();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onModal(content: any, brandCar?: BrandCar): void{
    this.brandForm = new FormGroup({
      brandName: new FormControl(''),
      description: new FormControl('')
    })
    this.brandForm.setValue({
      brandName: brandCar?.brandName || '',
      description: brandCar?.description || ''
    })

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true})
    .result.then(
      (result) => {
        if (result === 'add') {
          this.onAddBrand();
        }
        if (result === 'remove') {
          this.onRemoveBrand(brandCar.id);
        }
        if (result === 'modify') {
          this.onModifyBrand(brandCar);
        }
    },
     (reason) => {
        console.log(reason);
    });
  }
}