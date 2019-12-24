/* Fill in your Name and GNumber in the following two comment fields
 * Name: Venkata Pratyush Kodavanti
 * GNumber:01225485
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "node.h"
#include "hash.h"
/* (IMPLEMENT THIS FUNCTION)
 * In this function, you will create a new Symtab struct.
 * Follow the Directions in the Project Documentation for this Function
 * Return the pointer to the new symtab.
 * On any memory errors, return NULL
 */

Symtab *hash_initialize()
{
  /* Implement this function */
  Symtab *dummy_node= malloc(sizeof(Symtab));                        
  Symbol **array_table_add = malloc(sizeof(Symbol*)*HASH_TABLE_INITIAL);
  if(dummy_node ==NULL || array_table_add==NULL)          //checking if the symtab is null or the pointer to the symtab address is null 
  {
   return NULL;
  }
  dummy_node->size = 0;                            //setting size of the symbol table is 0
  dummy_node->capacity = HASH_TABLE_INITIAL;      //setting the capacity to hash table initial
  dummy_node->table = array_table_add;           //
  for(int i=0; i<HASH_TABLE_INITIAL;i++)        //looping through the capacity of the table and set each value to NULL
  {
	  (array_table_add)[i] = NULL;
  }
  return dummy_node;

}
/* (IMPLEMENT THIS FUNCTION)
 * Destroy your Symbol Table.
 * Follow the Directions in the Project Documentation for this Function
 * Return on any memory errors.
 */
void hash_destroy(Symtab *symtab) 
{
  /* Implement this function */
  if(symtab ==NULL || symtab->table==NULL)
  {
  return;
  }
  int i;
  int size = symtab->capacity;
  Symbol **table_walker = symtab->table;
  Symbol *walker= NULL;
  Symbol *reaper = NULL;
  for(i=0; i<size; i++)          //loop trough the capacity of the symbol table      
  {
	walker = table_walker[i];
	while(walker!=NULL)	//loop through the chain of symbols in the for each element in the symbol 
	{
	  reaper= walker;       
	  walker= walker->next;
	  symbol_free(reaper);
        }	
 }
   free(table_walker);
   table_walker=NULL;
   free(symtab);
   symtab=NULL;
}

/* (IMPLEMENT THIS FUNCTION)
 * Return the capacity of the table inside of symtab.
 * If symtab is NULL, return -1;
 */
int hash_get_capacity(Symtab *symtab) 
{
  /* Implement this function */

  if(symtab==NULL)
  {
  return -1;
  }
  return sizeof(symtab->table)/sizeof(Symbol*);
}
/* (IMPLEMENT THIS FUNCTION)
 * Return the number of used indexes in the table (size) inside of symtab.
 * If symtab is NULL, return -1;
 */
int hash_get_size(Symtab *symtab) {
  /* Implement this function */
  if(symtab==NULL)
  {
  return -1;
  }
  return symtab->size;
}

/* (IMPLEMENT THIS FUNCTION)
 * Adds a new Symbol to the symtab via Hashing.
 * Follow the Directions in the Project Documentation for this Function
 * If symtab is NULL, there are any malloc errors, or if any rehash fails, return -1;
 * Otherwise, return 0;
 */
int hash_put(Symtab *symtab, char *var, int val)
 {
  /* Implement this function */
 if(symtab == NULL || symtab->table == NULL)
 {
   return -1;
 }
 Symbol *check_existing_var = hash_get(symtab,var);
 if(check_existing_var!=NULL)                    //checking if the symbol exists
 {
    symbol_free(check_existing_var);
    int index =(hash_code(var))% symtab->capacity; //since i am getting a copy of the symbol. I find the index of the variable of the symbol in the symbol table
    Symbol *walker=(symtab->table)[index];     
    while(walker!=NULL)     // loop through the table
    { 
     if(!strcmp(walker->variable,var))   // check if the variable is equal to the variable in symbol table
     {
      walker->val = val;      //upadte the value in the symbol table.
      return 0;
     } 
     else
     {
       walker=walker->next;
     }
    }
     return 0;
  }
  if((double)(symtab->size) >= (2.0)*(symtab->capacity)) // checking the load factor of the symbol table
 {
    hash_rehash(symtab,symtab->capacity*2); //if load is greater than 2.0 than rehash  
 } 
 int index = (hash_code(var))%(symtab->capacity); 
 Symbol *walker = (symtab->table)[index];
 Symbol *previous =NULL;
 Symbol *new_symbol =symbol_create(var,val);
if(walker!=NULL)   //check if a symbol table index is empty
{
 while(walker!=NULL)   //loop through the chain of symbols 
  {
   previous = walker; 
   walker = walker->next;
  }
  previous->next = new_symbol;  // at the last element of the chain link our new symbol
}
else  // if the symbol table index is empty
{
 (symtab->table)[index] = new_symbol;  // put the new symbol in it
}
 symtab->size += 1;  //update the size of the symbol table
return 0;
}
/* (IMPLEMENT THIS FUNCTION)
 * Gets the Symbol for a variable in the Hash Table.
 * Follow the Directions in the Project Documentation for this Function
 * On any NULL symtab or memory errors, return NULL
 */
Symbol *hash_get(Symtab *symtab, char *var)
{
  /* Implement this function */
 if(symtab==NULL|| symtab->table==NULL)
 {
 return NULL;
 }
 int index=hash_code(var)%(symtab->capacity);           
 Symbol *walker = (symtab->table)[index];
   while(walker!=NULL)                                //looping through the table and checking if the variable exists in symbol table
   {
	 if(!strcmp(walker->variable,var))
	 {
		 return symbol_copy(walker);      //if yes return a copy of the symbol
	 }
	 walker=walker->next;
    }
 return NULL;
}
 /* (IMPLEMENT THIS FUNCTION)
 * Doubles the size of the Array in symtab and rehashes.
 * Follow the Directions in the Project Documentation for this Function
 * If there were any memory errors, set symtab->array to NULL
 * If symtab is NULL, return immediately.
 */
void hash_rehash(Symtab *symtab, int new_capacity) 
{
  /* Implement this function */
  if(symtab==NULL || symtab->table==NULL)      // if the symtab is NULL or table address is NULL return
  {
  return;
  }
  Symtab * old_symtab =malloc(sizeof(Symtab));                     //creating a new symtab
  Symbol **new_table = malloc(sizeof(Symbol*)*new_capacity);       //creating a new pointer pointing to the array of symbol table with new capacity
  if(new_table==NULL || old_symtab == NULL)                   //if there are any memeory errors set the symtab table to null
  {
   symtab->table = NULL;
   return;
  }
  for(int i =0; i<new_capacity; i++)            //looping to the array of symbol table and setting every index as NULL
  {
  new_table[i] = NULL;
  }
 old_symtab->size = symtab->size;              //the old symtab contains the size of the existing symtab
 old_symtab->capacity =symtab->capacity;      //the old symtab contains the capacity of the exisiting capacity
 old_symtab->table = symtab->table;          
 symtab->size = 0;                        
 symtab->capacity = new_capacity;
 symtab->table = new_table;
 for(int i =0; i<(old_symtab->capacity);i++)   //looping through the old symboltables capcaity and putting the symbols in the new table
 {
  Symbol *walker = (old_symtab->table)[i];
  while(walker!=NULL)
  { 
   hash_put(symtab, walker->variable,walker->val);
   walker = walker->next;
  }
 }
  hash_destroy(old_symtab);            //destroying the old symbol table.
  return;
}

/* Implemented for you.
 * Provided function to print the symbol table */
void hash_print_symtab(Symtab *symtab) {
  if(symtab == NULL) {
    return;
  }
  printf("|-----Symbol Table [%d size/%d cap]\n", symtab->size, symtab->capacity);

  int i = 0;
  Symbol *walker = NULL;

  /* Iterate every index, looking for symbols to print */
  for(i = 0; i < symtab->capacity; i++) {
    walker = symtab->table[i];
    /* For each found linked list, print every symbol therein */
    while(walker != NULL) {
      printf("| %10s: %d \n", walker->variable, walker->val);
      walker = walker->next;
    }
  }
  return;
}

/* This function is written for you.
 * This computes the hash function for a String
 */
long hash_code(char *var) {
  long code = 0;
  int i;
  int size = strlen(var);

  for(i = 0; i < size; i++) {
    code = (code + var[i]);
    if(size == 1 || i < (size - 1)) {
      code *= 128;
    }
  }

  return code;
}
											
