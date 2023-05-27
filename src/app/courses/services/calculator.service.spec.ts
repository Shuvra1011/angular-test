
import { TestBed } from '@angular/core/testing';
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

xdescribe('CalculatorService', () => {

    let loggerSpy: any, calculatorService: CalculatorService;

    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj(LoggerService, ['log']);
      

        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                // LoggerService // using this will create a new instance of the LoggerService. But we want to use the loggerSpy
                {provide: LoggerService, useValue: loggerSpy} // this will use the loggerSpy instead of creating a new instance of the LoggerService
            ]
        }); // this is to make sure that the LoggerService is available in the TestBed
        calculatorService = TestBed.inject(CalculatorService); // this is to make sure that the CalculatorService is available in the TestBed
    })

    it('should add two numbers', ()=>{
        // pending();
        // fail();
        // ###### AAA - Arrange, Act, Assert ######
        // const service = new CalculatorService(new LoggerService); // Setup/ Arrange 
        // const result = service.add(2,2); // Act/ Exercise/ Execute
        // expect(result).toBe(4); // Assert

        // // ###### Jasmine spy ######
        // const logger = new LoggerService();
        // spyOn(logger, 'log');
        // const service = new CalculatorService(logger);
        // const result = service.add(2,2);
        // expect(result).toBe(4);
        // expect(logger.log).toHaveBeenCalledTimes(1);

        // // ###### Create mock dependencies using Jasmine spy ######
        // const logger = jasmine.createSpyObj(LoggerService, ['log']); // no need to use spyOn, cause we already created a spy object
        // const service = new CalculatorService(logger);
        // const result = service.add(2,2);
        // expect(result).toBe(4);
        // expect(logger.log).toHaveBeenCalledTimes(1);

        // // ###### use beforeEach() ######
        const result = calculatorService.add(2,2);
        expect(result).toBe(4);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    })
    it('should subtract two numbers', ()=>{
        // pending();
        // const service = new CalculatorService(new LoggerService); // Setup/ Arrange 
        // const result = service.subtract(2,2); // Act/ Exercise/ Execute
        // expect(result).toBe(0, 'Unexpected output'); // Assert

        // ###### use beforeEach() ######
        const result = calculatorService.subtract(2,2); // Act/ Exercise/ Execute
        expect(result).toBe(0, 'Unexpected output'); // Assert
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    })
});