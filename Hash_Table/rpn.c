/* Fill in your Name and GNumber in the following two comment fields
 * Name:Venkata Pratyush Kodavanti
 * GNumber:01225485
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "stack.h"
#include "token.h"
#include "hash.h"

/* Local Function Declarations (that you need to finish implementing) */
static int read_file(char *filename, char *line);
static int parse_token(Symtab *symtab, Stack_head *stack, Token *tok);
void operator_helper(Symtab *symtab,Stack_head *stack, Token *tok);
void assignment_helper(Symtab *symtab,Stack_head *stack);
/* Pre-Written Local Function Declarations */
static void print_header(char *filename, int step);
static void print_step_header(int step);
static void print_step_footer(Symtab *symtab, Stack_head *stack);
static void print_step_output(int val);

/* Defines the largest line that can be read from a file */
#define MAX_LINE_LEN 255

/* This has been written for you.
 * Main function to run your program (written for you).
 * 1) Opens the file using the passed in filename. (your function)
 * -- If the file is not found (ie. fopen returns NULL), then exit(-1);
 * 2) Reads one line from the file.
 * -- The programs will all only be one line in size.
 * -- That line may be up to MAX_LINE_LEN long.
 * 3) Closes the file.
 * 4) Calls token_read_line(line, strlen(line))
 * -- This parses the line and prepares the tokens to be ready to get.
 * 5) While there are tokens remaining to parse: token_has_next() != 0
 * -- a) Get the next token: token_get_next()
 * 6) Parse the token (your function)
 * 7) Print out all of the relevant information
 */
int rpn(Stack_head *stack, Symtab *symtab, char *filename) {
  int step = 0; /* Used to track the program steps */
  int ret = 0;
  char line[MAX_LINE_LEN];
  Token *tok = NULL;

  /* Complete the read_file function that is defined later in this file. */
  ret = read_file(filename, line);
  if(ret != 0) 
  {
    printf("Error: Cannot Read File %s.  Exiting\n", filename);
    exit(-1);
  }

  /* Pass the line into the tokenizer to initialize that system */
  token_read_line(line, strlen(line));

  /* Prints out the nice program output header */
  print_header(filename, step);

  /* Iterate through all tokens */
  while(token_has_next()) {
    /* Begin the next step of execution and print out the step header */
    step++; /* Begin the next step of execution */
    print_step_header(step);

    /* Get the next token */
    tok = token_get_next();
    /* Complete the implementation of this function later in this file. */
    ret = parse_token(symtab, stack, tok);
    if(ret != 0)
	{
      printf("Critical Error in Parsing.  Exiting Program!\n");
      exit(-1);
    }

    /* Prints out the end of step information */
    print_step_footer(symtab, stack);
  }

  return 0;
}

/* (IMPLEMENT THIS FUNCTION)
 * Local function to open a file or exit.
 * Follow the Directions in the Project Documentation for this Function
 * Open filename, read its contents (up to MAX_LINE_LEN) into line, then
 *   close the file and return 0.
 * On any file error, return -1.
 */
static int read_file(char *filename, char *line) {
  /* Implement This Function */
  FILE *fp = fopen(filename,"r");  //calling flie pointer ro read the file.
  if(fp==NULL)                     // if file pointer is null return-1
  {
	  return -1;
  }
  else
  {
	  while(feof(fp)==0)                        // looping till we reach the end of file
	  {
		  fgets(line, MAX_LINE_LEN, fp);     // fgets to store characters upto MAX_LINE_LEN in character array line from the stream fp. 
	  }
	 fclose(fp);             //closing the file.
  }
  return 0;
}

/* (IMPLEMENT THIS FUNCTION)
 * Parses the Token to implement the rpn calculator features
 * Follow the Directions in the Project Documentation for this Function
 * You may implement this how you like, but many small functions would be good!
 * If the token you are passed in is NULL, return -1.
 * If there are any memory errors, return -1.
 */
static int parse_token(Symtab *symtab, Stack_head *stack, Token *tok)
{
  /* Implement This Function */
  if(tok==NULL)
  {
  return -1;
  }
  else
  {
	  Token *print_val = NULL;  
	  switch(tok->type)        //switch case to chech the type of the token
	  {
		  case TYPE_ASSIGNMENT: assignment_helper(symtab,stack);   // if the token type is assignment then call the assignment helper
					token_free(tok);
				        break;
		   case TYPE_OPERATOR:  operator_helper(symtab,stack, tok); // if token type is operator then call the operator helper
					token_free(tok);
					break;
		   case TYPE_VARIABLE:  stack_push(stack, tok);             // if the token type is a variable push it in the stack
		                        break;
		   case TYPE_VALUE:     stack_push(stack,tok);             // if the token type is a value push it in the stack
					break;
		   case TYPE_PRINT:     print_val =stack_pop(stack);       // if the token type is  print pop fron the stack and print it
					if((print_val->type)==TYPE_VARIABLE) //checking if the token is of type variable
					{
					  Symbol *print_value = hash_get(symtab, print_val->variable); //getting its value from symbol table
					  print_step_output(print_value->val);
					  symbol_free(print_value);
					}
					else{
					print_step_output(print_val->value);}
					token_free(tok);
					token_free(print_val); 
					break;

		   default:             printf("the token is type is invalid \n");   // if the token is not amoung any of the above mentioned cases 
					break;
	  }
   }
	return 0;
 }

void assignment_helper(Symtab *symtab, Stack_head *stack)
{
 if(symtab==NULL||stack ==NULL)
{
  return;
}
  Token *first_pop =stack_pop(stack);
  Token *second_pop= stack_pop(stack);
  if((first_pop!=NULL)&&(second_pop!=NULL))
  {   //checking if both the tokens popped from the stack are not null.
   if((first_pop->type)==TYPE_VARIABLE)
  { //chechking if the 1st token is a varaiable
	Symbol *value = hash_get(symtab, first_pop->variable); //getting the value from hash table
	int val = value->val; //updating its value
	hash_put(symtab,second_pop->variable,val);//and put in the symbol table
        symbol_free(value);
  }
  
  else
  {
   hash_put(symtab,second_pop->variable,first_pop->value);      //storing them in the hash table
  }
 }
token_free(first_pop);
token_free(second_pop);
return; 
}



 // This is a helper function to parse_token to help with the operator.
void operator_helper(Symtab *symtab,Stack_head *stack, Token *tok)
{
	if(tok==NULL || stack==NULL)
	{
		return;
	}
	Token *first_pop = NULL;
	Token *second_pop = NULL;
	Token *result = NULL;
	int res =0;
	int first_value=0;
	int second_value=0;
	first_pop = stack_pop(stack);
	second_pop =stack_pop(stack);
        if((first_pop!=NULL)&&(second_pop!=NULL))
	{
	if(((first_pop->type)==TYPE_VARIABLE)&&(second_pop->type)==TYPE_VARIABLE) /*checking if the type of 1st and 2nd tokens from the stack 
                                                                                      are of the type variable*/
	{
		Symbol *first_val = hash_get(symtab,first_pop->variable);
		Symbol *second_val = hash_get(symtab,second_pop->variable);
                if((first_val!=NULL)&&(second_val!=NULL))      //check if both the variables exist in the symbol table.
		{
		  first_value = first_val->val;	            //assigning the value of the 1st token to an integer
		  second_value = second_val->val;          //assigning the value of the 2nd token to an integer
		  symbol_free(first_val);
		  symbol_free(second_val);
		}
	}
	else if((first_pop->type) == TYPE_VARIABLE)  // case where only the 1st token of the two tokens is a variable
	{
		Symbol *first_val = hash_get(symtab,first_pop->variable);  // getting the symbol from hashtable
		if(first_val!=NULL)      //  checking if it exits or not
		{
		  first_value = first_val->val;             //assigning the value from the symbol table to an integer.
		  second_value = second_pop->value;        //assigning the value of the token to an integer.
	        }
		symbol_free(first_val);
        }
	else if((second_pop->type)== TYPE_VARIABLE) //case where only the 2nd token is of type variable
	{
		Symbol *second_val =hash_get(symtab,second_pop->variable);  //getting the symbol from the symbol table
		if(second_val!=NULL)      //checking if it exists or not
		{
		  second_value = second_val->val;      //assigning the value from the symbol table to an integer
		  first_value = first_pop->value;      //assigning the value of the token to an integer
		}
		symbol_free(second_val);
	}		
 	else                         //case where both of them are not of the type variable
	{
		first_value = first_pop->value;
		second_value = second_pop->value;
	}
      }
      else
	{
		return;
	}	
	switch(tok->oper)
	{
		case OPERATOR_PLUS: res =(first_value)+(second_value);
							break;
		case OPERATOR_MINUS: res = (second_value)-(first_value);
							 break;
		case OPERATOR_MULT: res = (first_value)*(second_value);
							break;
		case OPERATOR_DIV: res = (second_value)/(first_value);
							break;				
		default:   printf("the operator type is invalid \n");
    }		
		result = token_create_value(res);  //after performing the operation we tokenize the result
		stack_push(stack,result);  // push the token in the stack.
		token_free(first_pop);
		token_free(second_pop);
                return;
}	



/* This has been written for you.
 * Prints out the main output header
 */
static void print_header(char *filename, int step) {
  printf("######### Beginning Program (%s) ###########\n", filename);
  printf("\n.-------------------\n");
  printf("| Program Step = %2d\n", step);
  token_print_remaining();
  printf("o-------------------\n");
}

/* This has been written for you.
 * Prints out the information at the top of each step
 */
static void print_step_header(int step) {
  printf("\n.-------------------\n");
  printf("| Program Step = %2d\n", step++);
}

/* This has been written for you.
 * Prints out the output value (print token) nicely
 */
static void print_step_output(int val) {
  printf("|-----Program Output\n");
  printf("| %d\n", val);
}

/* This has been written for you.
 * Prints out the information at the bottom of each step
 */
static void print_step_footer(Symtab *symtab, Stack_head *stack) {
  hash_print_symtab(symtab);
  stack_print(stack);
  token_print_remaining();
  printf("o-------------------\n");
}
			
