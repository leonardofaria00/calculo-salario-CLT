import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  INSS,
  RemuneracaoAtual,
  RemuneracaoFuturo,
} from './model/negocio-model';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.css'],
})
export class NegocioComponent implements OnInit {
  public formulario: FormGroup = new FormGroup({});
  public remuneracaoAtual: RemuneracaoAtual = new RemuneracaoAtual();
  public remuneracaoFuturo: RemuneracaoFuturo = new RemuneracaoFuturo();

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this._formBuilder.group({
      salarioAtual: [],
      valeRefeicaoAtual: [],
      valeAlimentacaoAtual: [],
      salarioFuturo: [],
      valeRefeicaoFuturo: [],
      valeAlimentacaoFuturo: [],
    });
  }

  public calcular(): void {
    this._setRemuneracaoAtual();
    this._setRemuneracaoFuturo();
    this._calculaINSS(this.remuneracaoAtual);
  }

  private _setRemuneracaoAtual() {
    this.remuneracaoAtual.salarioAtual = this.formulario.get(
      'salarioAtual'
    )?.value;
    this.remuneracaoAtual.valeRefeicaoAtual = this.formulario.get(
      'valeRefeicaoAtual'
    )?.value;
    this.remuneracaoAtual.valeAlimentacaoAtual = this.formulario.get(
      'valeAlimentacaoAtual'
    )?.value;
  }

  private _setRemuneracaoFuturo() {
    this.remuneracaoFuturo.salarioFuturo = this.formulario.get(
      'salarioFuturo'
    )?.value;
    this.remuneracaoFuturo.valeRefeicaoFuturo = this.formulario.get(
      'valeRefeicaoFuturo'
    )?.value;
    this.remuneracaoFuturo.valeAlimentacaoFuturo = this.formulario.get(
      'valeAlimentacaoFuturo'
    )?.value;
  }

  private _calculaINSS(remuneracao: RemuneracaoAtual): void {
    const aliquotaINSS: number = this._setAliquotaINSS(remuneracao);
  }

  private _setAliquotaINSS(remuneracao: RemuneracaoAtual): number {
    let inss: INSS = new INSS();
    let aliquota: number = 0;

    if (remuneracao.salarioAtual <= inss.categoria.categoria1[0]) {
      aliquota = inss.aliquota.aliquota1; // 7,5%
    }

    if (
      remuneracao.salarioAtual >= inss.categoria.categoria2[0] &&
      remuneracao.salarioAtual <= inss.categoria.categoria2[1]
    ) {
      aliquota = inss.aliquota.aliquota2; //9%
    }
    if (
      remuneracao.salarioAtual >= inss.categoria.categoria3[0] &&
      remuneracao.salarioAtual <= inss.categoria.categoria3[1]
    ) {
      aliquota = inss.aliquota.aliquota3; //12%
    }
    if (
      remuneracao.salarioAtual >= inss.categoria.categoria4[0] &&
      remuneracao.salarioAtual <= inss.categoria.categoria4[1]
    ) {
      aliquota = inss.aliquota.aliquota4; //14%
    }
    console.log(aliquota);
    return aliquota;
  }

  private _calculaSalarioLiquido(): void {
    //TODO
  }

  private _calculaIRRF(): void {
    //TODO
  }

  private _calculaRemuneracao(): void {
    //TODO
  }
}
