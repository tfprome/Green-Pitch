import * as React from "react"
import { cn } from "@/lib/utils"

/* ============================= */
/*           TABLE               */
/* ============================= */

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
    <table
      ref={ref}
      className={cn(
        "w-full caption-top text-sm font-sans",
        className
      )}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

/* ============================= */
/*         TABLE CAPTION         */
/* ============================= */

// const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
//   <caption
//     ref={ref}
//     className={cn(
//       "py-4 text-sm text-gray-500",
//       className
//     )}
//     {...props}
//   />
// ))
// TableCaption.displayName = "TableCaption"

/* ============================= */
/*         TABLE HEADER          */
/* ============================= */

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "bg-gray-50 border-b border-gray-200",
      className
    )}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

/* ============================= */
/*          TABLE BODY           */
/* ============================= */

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "divide-y divide-gray-100",
      className
    )}
    {...props}
  />
))
TableBody.displayName = "TableBody"

/* ============================= */
/*          TABLE FOOTER         */
/* ============================= */

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "bg-gray-50 border-t border-gray-200 font-medium",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

/* ============================= */
/*           TABLE ROW           */
/* ============================= */

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "transition-colors hover:bg-gray-50",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

/* ============================= */
/*        TABLE HEAD CELL        */
/* ============================= */

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "px-6 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

/* ============================= */
/*         TABLE DATA CELL       */
/* ============================= */

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-6 py-4 text-sm text-gray-700",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"



/* ============================= */
/*           EXPORTS             */
/* ============================= */

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  //TableCaption,
}