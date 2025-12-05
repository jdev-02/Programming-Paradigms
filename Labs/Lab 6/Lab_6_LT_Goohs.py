'''
Lab 08 - CS3022 Programming Paradigms Pease Number
'''

#input:int n  output:int  
# desc:return Fibonacci number n using memoization
fib_table = {0:0,1:1}
def fib_num(n):
    if n in fib_table:
        return fib_table[n]
    value = fib_num(n-1) + fib_num(n-2)
    fib_table[n] = value
    return value

#input:int n  output:dict[int,int] 
#return lookup table of Fibonacci numbers from 0..n
def fib_lookup_table(n):
    fib_num(n)
    return {k:fib_table[k] for k in range(n+1)}


#input:int n  output:int  
#return Collatz step count for n using memoization
collatzs = {1:0}
def collatz_seq(n):
    if n in collatzs:
        return collatzs[n]
    if n % 2 == 0:
        steps = 1 + collatz_seq(n//2)
    else:
        steps = 1 + collatz_seq(3*n + 1)
    collatzs[n] = steps
    return steps

#input:int n  output:dict[int,int] 
# return lookup table of Collatz steps for 1..n
def collatz_step_count_lookup_table(n):
    for k in range(1, n+1):
        collatz_seq(k)
    return {k:collatzs[k] for k in range(1, n+1)}


#input:int month,int day,int year  output:(int,int)  
# desc:return Fibonacci(month), Fibonacci(day)
def fibo_bday(month, day, year):
    return (fib_lookup_table(month)[month],
            fib_lookup_table(day)[day])


#input:int month,int day,int year  output:(int,int,int)  
# desc:return Collatz(Fib(month)), Collatz(Fib(day)), Collatz(year)
def collatz_fibo_birthday(month, day, year):
    fib_month, fib_day = fibo_bday(month, day, year)
    month_steps = collatz_step_count_lookup_table(fib_month)[fib_month]
    day_steps   = collatz_step_count_lookup_table(fib_day)[fib_day]
    year_steps  = collatz_step_count_lookup_table(year)[year]
    return (month_steps, day_steps, year_steps)


#input:int month,int day,int year  output:int  
#desc:return Pease number = sum of three Collatz values
def pease_number(month, day, year):
    c_month, c_day, c_year = collatz_fibo_birthday(month, day, year)
    return c_month + c_day + c_year


#input:str,str,str  output:(int,int,int)|None  
# desc:convert strings to ints and validate date fields
def input_parse(month_str, day_str, year_str):
    try:
        month = int(month_str)
        day   = int(day_str)
        year  = int(year_str)
    except ValueError:
        return None
    if not (1 <= month <= 12):
        return None
    if not (1 <= day <= 31):
        return None
    if year <= 0 or len(year_str) > 4:
        return None
    return (month, day, year)

class Box:
    '''input: any value output: box 
    desc: immutable container for chaining operations'''
    def __init__(self,val):
        self.val = val
    def bind(self, f):
        return Box(f(self.val))
    
#input:(str,str,str) output:(int,int,int)|None
#desc:adapter for input_parse for use with Box
def parse_inputs_box(triple):
    month_str, day_str, year_str = triple
    return input_parse(month_str, day_str, year_str)

#input:(int,int,int) output:(int,int,int)
#desc:map (month,day,year) to (Fib(month),Fib(day),year)
def to_fibo_triple(triple):
    month, day, year = triple
    fib_m, fib_d = fibo_bday(month, day, year)
    return (fib_m, fib_d, year)

#input:(int,int,int) output:(int,int,int)
#desc:map (Fib(month),Fib(day),year) to Collatz step counts triple
def to_collatz_triple(triple):
    fib_month, fib_day, year = triple
    month_steps = collatz_step_count_lookup_table(fib_month)[fib_month]
    day_steps   = collatz_step_count_lookup_table(fib_day)[fib_day]
    year_steps  = collatz_step_count_lookup_table(year)[year]
    return (month_steps, day_steps, year_steps)

#input:(int,int,int) output:int
#desc:sum three Collatz step counts to Pease number
def to_pease(triple):
    c_month, c_day, c_year = triple
    return c_month + c_day + c_year

#input:none  output:none  desc:interactive loop using recursion to compute and display Pease numbers
def main():
    try:
        month_str = input("Enter a month: ")
        day_str   = input("Enter a day in the month: ")
        year_str  = input("Enter a year: ")
    except (EOFError, KeyboardInterrupt):
        print("Exiting due to Keyboard Interrupt or EOF Error.\n")
        return

    parsed = input_parse(month_str, day_str, year_str)

    if parsed is None:
        print("Invalid input, try again.\n")
    else:
        month, day, year = parsed
        pease_monadic_calc = (
            Box((month_str, day_str, year_str))
            .bind(parse_inputs_box)
            .bind(to_fibo_triple)
            .bind(to_collatz_triple)
            .bind(to_pease)
            .val
        )        
        print(f"Pease number based off of regular functional flow: {pease_number(month, day, year)}")
        print(f"Pease number based off of monadic chaining: {pease_monadic_calc}")
        print("End this program with ctrl-c\n")

    main()  #recursive repeat

main()
