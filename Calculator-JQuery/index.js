let i = 0;
class Calculator {   
  constructor() {
    this.previousOperandElement, this.currentOperandElement ;
    this.clear(); //first time it will declare and define a variable
  }
  //method for create a window(Dispay window)
  createWindow(previousOperandElement, currentOperandElement) {
      this.previousOperandElement = previousOperandElement ;
      this.currentOperandElement = currentOperandElement ;
  }
  //method for clear the values
  clear() {
      this.currentOperand = '', this.previousOperand = '', this.operation = '' ;
  }
  //method for delete the Last Number
  deleteNum() {
      this.currentOperand = this.currentOperand.toString().slice( 0 , -1 ) ;
  }
  //method for append the value in result window
  appendNumber(number) {
      if( number === '.' && this.currentOperand.includes( '.' ) ) return
      this.currentOperand = this.currentOperand.toString() + number.toString() ;
  }
  //method for operations checking
  checkAndCompute( operation ) {
    if(this.currentOperand === '' ) return 
    if(this.previousOperand !== '') { //check the previous operand is not empty
      this.compute() ;
    }
    this.operation = operation ;
    this.previousOperand = this.currentOperand ;  //append the value in previousOperand
    this.currentOperand = '' ;
      
  }
  //method for operations.
  compute() {
    let computation ;
    const previous = parseFloat( this.previousOperand ),
       current = parseFloat( this.currentOperand ) ;
    if ( isNaN( previous ) || isNaN( current ) ) return
    switch ( this.operation ) {
      case '+' : 
        computation = previous + current ; //addtion
        break ;
      case '-' :
        computation = previous - current ; //subtraction
        break ;
      case '*' :
        computation = previous * current ; //multiplication
        break ;
      case '/' :
        computation = previous / current ; //division
        break ;
      case '%' :
        computation = previous % current ; //madulo division
        break ;
      default :
        return
    }
    this.currentOperand = computation ;  //append the value in currentOperand
    this.operation = undefined ;
    this.previousOperand = '' ;
  }
  //method for Dispay the value in perfect order
  getDisplayValue( number ) {
    const stringValue = number.toString(),
      integerValue = parseFloat( stringValue.split( '.' )[0] ), //before '.' value
      decimalValue = stringValue.split( '.' )[1] ; //after '.' value
    let display ;
    if ( isNaN( integerValue ) ) {
      display = '' ;
    } else {
      display = integerValue.toLocaleString( 'en' , {maximumFractionDigits : 0 }); //set an ',' separate value.
    }
    if ( decimalValue != null ) {
      return `${display}.${decimalValue}` ; // return the Value
    } else {
      return display ; // return the Value
    }
  }
  //method for update the value in display
  updateDisplay() {
      this.currentOperandElement[0].value = this.getDisplayValue( this.currentOperand ) ;
      if ( this.operation != null ) {
        this.previousOperandElement[0].innerText = `${this.getDisplayValue(this.previousOperand)} ${this.operation}` ;
      } else {
        this.previousOperandElement[0].innerText = '' ;
      }
  }
}
//Function for creating DOM elements.
function createDOMElements(container) {
     let btnValues = [
       {value:'AC',className:'clear'},
       {value:'⌫',className:'del'},
       {value:'%',className:'operator'},
       {value:'/',className:'operator'},
       {value:'7',className:'number'},
       {value:'8',className:'number'},
       {value:'9',className:'number'},
       {value:'*',className:'operator'},
       {value:'4',className:'number'},
       {value:'5',className:'number'},
       {value:'6',className:'number'},
       {value:'-',className:'operator'},
       {value:'1',className:'number'},
       {value:'2',className:'number'},
       {value:'3',className:'number'},
       {value:'+',className:'operator'},
       {value:'0',className:'number'},
       {value:'.',className:'number'},
       {value:'=',className:'equal'}
      ];    
     //create a Div
     let content = $("<div></div>") ;
     content.appendTo(container).attr("class", "mainDiv content"+i) ;//add into container div
     let contentDiv = $(".content"+i) ;
     //create a span tag
     let historyBox = $("<span></span>") ;
     historyBox.appendTo(contentDiv).attr("class", "previous-operand" ) ;
     //create a input box
     let inputBox = $("<input></input>") ;
     inputBox.appendTo(contentDiv).attr("class", "current-operand").attr("type" , "text").attr("placeholder" , "0.00" ) ;
     //for loop to create a buttons
     for( let j = 0 ; j < btnValues.length ; j++ ) {
        let createBtn = $("<input></input>") ;
        createBtn.appendTo(contentDiv).attr("type","button").attr("class", btnValues[j].className).attr("value", btnValues[j].value);
      }  
}

let calculator;
function createCalc(){
    calculator = new Calculator();
    let val = "cal" +i, 
      mainPage = $( "#main" ),
      calDiv = $("<div></div>") ;
    calDiv.appendTo(mainPage).attr("id",val) ;
    createDOMElements( $("#"+val) ) ; 
    initCalcEvent( $("#"+val) ) ;
    i++ ;
}
$(document).ready(function(){
  $("#create").click(function(){
    createCalc() ;
  });
});
//function for initialize calculator Event.
function initCalcEvent(calc){
    calc.on( "click", (ele) => {
          // get the windows
          previousOperandElement = calc.find( ".previous-operand" ) ;
          currentOperandElement = calc.find( ".current-operand" ) ;
          calculator.createWindow(previousOperandElement, currentOperandElement ) ; //function call
          let btnValue = ele.target, clickBtn = ele.target.classList ;
          console.log("previousOperandElement ",previousOperandElement );
          console.log("currentOperandElement",currentOperandElement );
          //check Number Buttons or not
          if (clickBtn.contains( "number" ) ) {
            console.log("I am called number btn..");
            console.log("Btn value is : ",btnValue.value);
            calculator.appendNumber( btnValue.value ) ;
            calculator.updateDisplay() ;
          }
          //check operator buttons or not
          else if (clickBtn.contains( "operator" ) ) {
            console.log("I am called operation btn..")
            calculator.checkAndCompute( btnValue.value ) ;
            calculator.updateDisplay() ;
          }
          //check equal button or not
          else if (clickBtn.contains( "equal" ) ) {
            console.log("I am called equal btn..")
            calculator.compute() ;
            calculator.updateDisplay() ;
          }
          //check clear button or not
          else if (clickBtn.contains( "clear" ) ) {
            console.log("I am called clear btn..")
            calculator.clear() ;
            calculator.updateDisplay() ;
          }
          //check delete button or not
          else if (clickBtn.contains( "del" ) ) {
            console.log("I am called del btn..")
            calculator.deleteNum() ;
            calculator.updateDisplay() ;
          }
    });
}


let allowedKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','%','=','Backspace','Delete'],
    operationsKeys = ['+','-','*','/','%'],
    numberKeys = ['0','1','2','3','4','5','6','7','8','9','.'],
    clearNum = 'Backspace',
    allClearNum = 'Delete',
    equalNum = '=';
// $(document).click(select_element);
$(document).keydown( function(ele) {
  console.log(ele) ;
  console.log("key dowm Event called");
   let currentOperandElement = ele.target,
       previousOperandElement = document.querySelector( ".previous-operand" ),
       inputKeyValue = ele.key;
    ele.preventDefault();
    if (!(allowedKeys.includes(inputKeyValue))){
      return
    } else if (operationsKeys.includes(inputKeyValue)) {
      calculator.checkAndCompute(inputKeyValue) ;
      calculator.updateDisplay() ;
    } else if (numberKeys.includes(inputKeyValue)) {
      calculator.appendNumber(inputKeyValue) ;
      calculator.updateDisplay() ;
    } else if (clearNum === inputKeyValue) {
      calculator.deleteNum() ;
      calculator.updateDisplay() ;
    } else if (allClearNum === inputKeyValue) {
      calculator.clear() ;
      calculator.updateDisplay() ;
    } else if (equalNum === inputKeyValue) {
      calculator.compute() ;
      calculator.updateDisplay() ;
    }
});