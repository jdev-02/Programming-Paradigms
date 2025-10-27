## LT Jonathan Goohs
## CS3022 Lab 3 Report

## 0 – What are the three errors?​
## Error 1 - 
AnimalUtil::Animal* mysteryAnimal;
AnimalUtil::toStr(*mysteryAnimal) is dereferencing an unitialized pointer
## Error 2 -
mysteryAnimal = nullptr; toStr(*mysteryAnimal)
is dereferncing a nullptr causing a segfault
## Error 3 -
Inside while true: mysteryAnimal = new AnimalUtil::Animal... is many iterations of declaring new dynamic memory allocation without freeing that memory afterwards.
## 1 – When mysteryAnimal is declared, the next instruction prints out: “The animal is initialized to: …” It is never initialized to a variable. Why does this not crash?? What is it being initialized to??​
This appears to "work" because the uninitialized memory happened to contain a value matching an enum value (2 = CAT). This is undefined behavior, not correct programming as the same code could crash on different runs or systems.
## 2 – Why is your program crashing on this line: “std::cout << "The animal should initally be nothing:…”?​
Because the pointer to the object is nullified, when you try to dereference that pointer in the call to toStr, there is undefined behavior since the value of a is not one specified from the switch cases in the method implementation, therefore causing a segmentation fault. This is a classic pointer mistake, trying to access something after it is nullified.
## 3 – Run the program for 3 different guesses. On each guess, print out:​

## The address of the mysteryAnimal pointer​
## The address where the pointer is pointing​
## The value located at the address where the pointer is pointing.​
## Draw a picture diagraming each of these memory locations with their values.​

address of static welcome messages0x7ff7b4b08040
pointer address: 0x15b47ffca8
Points to address: 0x1f8c8a4da90
Value at address: 4

Your guess: 4
Pointer address: 0x15b47ffca8
Points to address: 0x1f8c8a4da90
Value at address: 4
Correct! It was Fish
Pointer address: 0x15b47ffca8
Points to address: 0x1f8c8a4da90
Value at address: 4
Pointer address: 0x15b47ffca8
Points to address: 0x1f8c8a49db0
Value at address: 1

Your guess: 1
Pointer address: 0x15b47ffca8
Points to address: 0x1f8c8a49db0
Value at address: 1
Correct! It was Dog
Pointer address: 0x15b47ffca8
Points to address: 0x1f8c8a49db0
Value at address: 1
Pointer address: 0x15b47ffca8
Points to address: 0x1f8c8a49dd0
Value at address: 2

Your guess: 2
Pointer address: 0x15b47ffca8
Points to address: 0x1f8c8a49dd0
Value at address: 2
Correct! It was Cat
Pointer address: 0x15b47ffca8
Points to address: 0x1f8c8a49dd0
Value at address: 2
Pointer address: 0x15b47ffca8
Points to address: 0x1f8c8a49df0
Value at address: 3

## Is the stack growing from the bottom (0x0000….) or the top (0xFFFFF…) of memory?​

As you can see from the above debugging, the stack is growing from the bottom, because I entered more guesses, the new addresses for future mysterAnimals were growing closer to 0xFFFFF, like 0x1f8c8a49dd0 -> 0x1f8c8a49df0

## 4 - Relative to the stack and heap, where is the staticWelcomeMessage located? What is its address? Add it to the diagram.​

0x7ff7b4b08040 is rather high up in memory so I think that staticWelcomeMessage is located in the static/data segment of memory.

In conclusion:

Data Segment:
0x7ff7b4b08040: staticWelcomeMessage

Stack:
0x15b47ffca8: mysteryAnimal pointer

Heap:
0x1f8c8a4da90: Animal(4)
0x1f8c8a49db0: Animal(1)
0x1f8c8a49dd0: Animal(2)


