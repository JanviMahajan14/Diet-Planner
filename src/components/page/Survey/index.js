import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Select from '../../shared/Form/Select';
import Button from '../../shared/Button';
import Tabs, { Tab } from '../../shared/Tabs';
import RadioGroup, { Radio } from '../../shared/Form/Radio';
import Nav from '../../shared/Nav';
import { CheckboxGroup } from '../../shared/Form/Checkbox';
import { getSurveyData } from '../../../utils/data';
import getPlan from '../../../utils/mealPlan';
import { withTranslation } from 'react-i18next';
import './Survey.scss';

 class Survey extends Component {
 
  componentWillMount(){
    this.data = getSurveyData();
    const count = this.data.selectOpt.mealCount[0].val;
    const plan =  this.data.selectOpt.planType[0].val;
    const defaultDiet = {
      activeIndex : 0,
      name : this.data.dietSpec[0].name,
    };
    const calories = {
      activeIndex : 0,
      selected : 'rec',
      min : this.data.calories.min,
      max : this.data.calories.max,
    }
    
    this.setState({
      mealCount: count,
      planType: plan,
      calories: calories,
      healthSymptoms: {},
      healthPreferences: {},
      diseases: {},
      diet: defaultDiet,
      loading: false,
      redirect: false,
    });
  }

  handleHealth = (name) => {
    this.setState ((prevState) => {
      let value = prevState.healthPreferences[name] ? !prevState.healthPreferences[name] : true;
      return {healthPreferences : {...prevState.healthPreferences,[name]:value}}
    });
  }

  handleSymptoms = (name) => {
    this.setState ((prevState) => {
      let value = prevState.healthSymptoms[name] ? !prevState.healthSymptoms[name] : true;
      return {healthSymptoms : {...prevState.healthSymptoms,[name]:value}}
    });
  }

  handleDiseases = (name) => {
    this.setState ((prevState) => {
      let value = prevState.diseases[name] ? !prevState.diseases[name] : true;
      return {diseases : {...prevState.diseases,[name]:value}}
    });
  }

  handleCalories = (index) => {
    let selected = (parseInt(index,10) === 1) ? 'custom' : 'rec';
    this.setState({
      calories: {...this.state.calories, activeIndex: index, selected: selected }
    });
  }

  setCalories = (e) => {
    const target = e.target;
    if(target.value) {
      let value = parseInt(target.value,10);
      if(isNaN(value)){
        value = 0;
      }
      this.setState({calories: {...this.state.calories,[target.name]: value }});
    }
  }

  handleSelect = (e) => {
    const target = e.target;
    this.setState({[target.name]: parseInt(target.value,10)});
  }

  goTo = (e) => {
    e.preventDefault();
    const Tabs = this.tabs;
    switch(e.target.name){
      case "next":
        Tabs.handleClick(Tabs.state.activeIndex+1);
        break;
      case "back":
        Tabs.handleClick(Tabs.state.activeIndex-1);
        break;
      default:
      break;
    }
  }

  getMealPlan = (e) => {
    e.preventDefault();
    const { mealCount, planType, healthPreferences, calories, diet } = this.state;
    const meals = this.data.mealTypes[mealCount];
    const res = {
         plan: planType,
         health: healthPreferences,
         calories: {min:calories.min,max:calories.max},
         diet: diet.name,
      meals: meals,
    }
    this.setState({loading:true},() => {
      getPlan(res).then(
        (data) => {
          let par = {num:this.state.planType,data: data}
          //stop loading and redirect to meal page
          this.setState({loading:false, redirect: true, data: par});
        }
     );
    });
  }


  render(){
    const { selectOpt, symptoms, diseases, healthSpec } = this.data;
    const { t } = this.props;
    return(
      <div className="Survey">
        <Nav />
        {
          this.state.loading ?
          <div className="Survey__loading">
            <h1 className="Survey__loading__heading">{t('Survey.11')}</h1>
            <i className="fa fa-spinner Survey__loading__icon" aria-hidden="true"></i>
          </div>
          :
          <div className="Survey__content">
            <div className="Survey__heading"><h1>{t('Survey.1')}</h1></div>
            <form>

              <Tabs defaultIndex={0} ref = {component => {this.tabs = component}} className="Survey__tabs">
                <Tab heading="1">
                  <h2>{t('Survey.2')}</h2>
                  <Select name="mealCount" value={this.state.mealCount} handler={this.handleSelect} options={selectOpt.mealCount} />
                  <div className="Survey__goto">
                    <Button name="next" onClick={this.goTo} className="Survey__goto__button--next">{t('Survey.10')}</Button>
                  </div>
                </Tab>

                <Tab heading="2">
                  <h2>{t('Survey.3')}</h2>
                  <Select name="planType" value={this.state.planType} handler={this.handleSelect} options={selectOpt.planType} />
                  <div className="Survey__goto">
                    <Button name="back" onClick={this.goTo} className="Survey__goto__button--back">{t('Survey.9')}</Button>
                    <Button name="next" onClick={this.goTo} className="Survey__goto__button--next">{t('Survey.10')}</Button>
                  </div>
                </Tab>

                <Tab heading="3" >
                  <h2>{t('Survey.4')}</h2>
                  <CheckboxGroup data={healthSpec} toggleHandler={this.handleHealth} isCheckedState={this.state.healthPreferences} ></CheckboxGroup>
                  <div className="Survey__goto">
                    <Button name="back" onClick={this.goTo} className="Survey__goto__button--back">{t('Survey.9')}</Button>
                    <Button name="next" onClick={this.goTo} className="Survey__goto__button--next">{t('Survey.10')}</Button>
                  </div>
                </Tab>

                <Tab heading="4" >
                <h2>{t('Survey.5')}</h2>
                <CheckboxGroup data={symptoms} toggleHandler={this.handleSymptoms} isCheckedState={this.state.healthSymptoms}></CheckboxGroup>
                <div className="Survey__goto">
                  <Button name="back" onClick={this.goTo} className="Survey__goto__button--back">{t('Survey.9')}</Button>
                  <Button name="next" onClick={this.goTo} className="Survey__goto__button--next">{t('Survey.10')}</Button>
                </div>
                </Tab>

                <Tab heading="5" >
                  <h2>{t('Survey.6')}</h2>
                  <CheckboxGroup data={diseases} toggleHandler={this.handleDiseases} isCheckedState={this.state.diseases}></CheckboxGroup>
                  <div className="Survey__goto">
                    <Button name="back" onClick={this.goTo} className="Survey__goto__button--back">{t('Survey.9')}</Button>
                    <Button name="next" onClick={this.goTo} className="Survey__goto__button--next">{t('Survey.10')}</Button>
                  </div>
                </Tab>

                <Tab heading="6">
                  <h2>{t('Survey.7')}</h2>
                  <RadioGroup handleChange={this.handleCalories} activeIndex={this.state.calories.activeIndex}>
                    <Radio>{t('Survey.12')}</Radio>
                    <Radio>{t('Survey.13')}</Radio>
                  </RadioGroup>
                  {
                    this.state.calories.selected === "custom" ?
                      ( <div className="Survey__input--custom">
                          <input placeholder="min" type="number" name="min" onChange={this.setCalories} value={this.state.calories.min} />
                          <input placeholder="max" type="number" name="max" onChange={this.setCalories} value={this.state.calories.max}/>
                        </div>
                      )
                      :null
                    }
                  <div className="Survey__goto">
                    <Button name="back" onClick={this.goTo} className="Survey__goto__button--back">{t('Survey.9')}</Button>
                    <Button onClick={this.getMealPlan} className="Survey__goto__button--next">{t('Survey.14')}!</Button>
                  </div>
                </Tab>


                <Tab heading="7">
                  <h2>{t('Survey.8')}</h2>
                  <div>
                  <input type="radio" value={true} name="worker" /> {t('Survey.15')}
                  <input type="radio" value={false} name="worker" /> {t('Survey.16')}
                  </div>
                  <div className="Survey__goto">
                    <Button name="back" onClick={this.goTo} className="Survey__goto__button--back">{t('Survey.9')}</Button>
                    <Button name="next" onClick={this.getMealPlan} className="Survey__goto__button--next">{t('Survey.14')}!</Button>
                  </div>
                </Tab>
              </Tabs>

            </form>
          </div>
        }
        {
          this.state.redirect ? <Redirect to={{pathname:"/meal-plan",state:{data:this.state.data}}}/> : null
        }
      </div>
    )
  }
}

export default withTranslation()(Survey);
