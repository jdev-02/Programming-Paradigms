#include <iostream>
#include <cstdlib>
#include <ctime>
#include <limits>

class AnimalUtil {
public:
    enum Animal {UNKNOWN, DOG, CAT, BIRD, FISH };

    static const char* toStr(Animal a) {
        switch (a) {
            case DOG:  return "Dog";
            case CAT:  return "Cat";
            case BIRD: return "Bird";
            case FISH: return "Fish";
            default:   return "Unknown";
        }
    }
};

const std::string staticWelcomeMessage = "Welcome to the Animal Guesser!";

int main() {
    std::srand(static_cast<unsigned>(std::time(nullptr)));

    std::cout << staticWelcomeMessage << "\n";
    std::cout << "address of static welcome messages" << &staticWelcomeMessage << std::endl;

    std::cout << "Guess the Animal! (1: Dog, 2: Cat, 3: Bird, 4: Fish)\n";
    std::cout << "Enter 0 to quit.\n";

    AnimalUtil::Animal* mysteryAnimal = new AnimalUtil::Animal(AnimalUtil::UNKNOWN);  
    std::cout << "Pointer address: " << &mysteryAnimal << std::endl;
    std::cout << "Points to address: " << mysteryAnimal << std::endl;
    std::cout << "Value at address: " << static_cast<int>(*mysteryAnimal) << std::endl;
    std::cout << "The animal is initialized to: " << AnimalUtil::toStr(*mysteryAnimal) << "\n";
    
    std::cout << "The animal should initally be nothing: " << AnimalUtil::toStr(*mysteryAnimal) << "\n";
    
    // Error #3 - Figure it out. The error assumes good user behavior. 
    // It has nothing to do with validation checking.
    while (true) {
        delete mysteryAnimal; //delete previous loops object allocation
        mysteryAnimal =
            new AnimalUtil::Animal(static_cast<AnimalUtil::Animal>(1 + std::rand() % 4));
        std::cout << "Pointer address: " << &mysteryAnimal << std::endl;
        std::cout << "Points to address: " << mysteryAnimal << std::endl;
        std::cout << "Value at address: " << static_cast<int>(*mysteryAnimal) << std::endl;
        std::cout << "\nYour guess (or press 0 to quit this application): ";
        int guess = -1;
        if (!(std::cin >> guess)) {
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            std::cout << "Invalid input; try again.\n";
            continue;
        }
        if (guess < 0 || guess > 4 ) {
            //input validation
            std::cout << "Invalid input; try again." << std::endl;
            continue;
        }
        if (guess == 0) {
            std::cout << "Bye!\n";
            break;
        }

        if (*mysteryAnimal == static_cast<AnimalUtil::Animal>(guess)) {
            std::cout << "Pointer address: " << &mysteryAnimal << std::endl;
            std::cout << "Points to address: " << mysteryAnimal << std::endl;
            std::cout << "Value at address: " << static_cast<int>(*mysteryAnimal) << std::endl; 

            std::cout << "Correct! It was " << AnimalUtil::toStr(*mysteryAnimal) << "\n";
            std::cout << "Pointer address: " << &mysteryAnimal << std::endl;
            std::cout << "Points to address: " << mysteryAnimal << std::endl;
            std::cout << "Value at address: " << static_cast<int>(*mysteryAnimal) << std::endl;
        } else {
            std::cout << "initial value before tostr conversion" << &mysteryAnimal << std::endl; 

            std::cout << "Wrong! It was " << AnimalUtil::toStr(*mysteryAnimal) << "\n";
                std::cout << "value after tostr conversion" << &mysteryAnimal << std::endl; 
\
        }
    }
    delete mysteryAnimal; 
    return 0;
}
